from flask import jsonify, request, Blueprint
from models import db, User, TokenBlocklist
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, create_access_token
from werkzeug.security import check_password_hash, generate_password_hash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from datetime import datetime, timezone
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
import os
from flask_cors import cross_origin

auth_bp = Blueprint('auth', __name__)

# Secure serializer using secret from .env
serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY", "fallback-secret-key"))

# --- Login with Email/Password ---
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if user.is_google_account:
        return jsonify({"error": "This account was created with Google. Please use Google login."}), 403

    if check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": access_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role
            }
        }), 200

    return jsonify({"error": "Invalid email or password"}), 401

# --- Login with Google ---
@auth_bp.route('/google', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:5173', methods=['POST', 'OPTIONS'], supports_credentials=True)

def login_with_google():
    data = request.get_json()
    token = data.get('token')

    try:
        # 1. Verify token with Google
        idinfo = id_token.verify_oauth2_token(
            token,
            grequests.Request(),
            os.getenv("GOOGLE_CLIENT_ID")
        )

        # 2. Extract user info
        email = idinfo['email']
        name = idinfo.get('name') or email.split('@')[0]

        # 3. Check if user exists
        user = User.query.filter_by(email=email).first()

        # 4. Create user if not exists
        if not user:
            user = User(
                 username=name,
                 email=email,
                 password=generate_password_hash(os.urandom(12).hex()),
                 role='mentee',
                 is_google_account=True
                )
            db.session.add(user)
            db.session.commit()

        # 5. Create JWT token
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'role': user.role
            }
        }), 200

    except Exception as e:
        print("Google token verification failed:", e)
        return jsonify({'error': 'Invalid Google token'}), 400

# --- Get Current User ---
@auth_bp.route('/current_user', methods=['GET'])
@jwt_required()
def current_user():
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'role': user.role
    }), 200

# --- Logout ---
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    db.session.add(TokenBlocklist(jti=jti, created_at=datetime.now(timezone.utc)))
    db.session.commit()
    return jsonify({"success": "Logged out successfully"}), 200

# --- Reset Password ---
@auth_bp.route('/reset-password/<token>', methods=['POST'])
def reset_password(token):
    new_password = request.get_json().get('password')
    if not new_password:
        return jsonify({"error": "Password is required"}), 400

    try:
        email = serializer.loads(token, salt="password-reset", max_age=1800)
    except SignatureExpired:
        return jsonify({"error": "Token has expired"}), 400
    except BadSignature:
        return jsonify({"error": "Invalid token"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.password = generate_password_hash(new_password)
    db.session.commit()
    return jsonify({"message": "Password reset successful"}), 200
