from flask import Blueprint, request, jsonify, abort
from models import db, User
from werkzeug.security import generate_password_hash


user_bp = Blueprint("user_bp", __name__)

# User CRUD Operations
@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    existing_user = User.query.filter_by(username=data['username']).first()
    
    if existing_user:
        return jsonify({"error": "Username already exists"}), 400  # Handle duplicate username
    
    phone_number = data.get('phone_number')
    if not phone_number:
          return jsonify({'error': 'Phone number is required'}), 400

    user = User(
        username=data['username'],
        email=data['email'],
        password = generate_password_hash(data['password']),
        role=data.get('role'),
        phone_number=data['phone_number'],
        isadmin=data.get('isadmin', False)
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully', 'id': user.id}), 201

@user_bp.route('/users', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, description='User not found')
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role,
        'phone_number': user.phone_number,
        'isadmin': user.isadmin
    })

@user_bp.route('/users', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        abort(404, description='User not found')
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.role = data.get('role', user.role)
    user.phone_number = data.get('phone_number', user.phone_number)
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@user_bp.route('/users', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        abort(404, description='User not found')
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})
