from flask import Flask, send_from_directory
from flask_migrate import Migrate
from models import db, TokenBlocklist
from flask_cors import CORS
from datetime import timedelta
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__, static_folder='static', static_url_path='/static')

# CORS setup for frontend origin
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Database config and migration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lost.db'
migrate = Migrate(app, db)
db.init_app(app)

# JWT Config
app.config["JWT_SECRET_KEY"] = "dgsjfgfgfeyyeyud" 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

# Import and register blueprints
from views import *
app.register_blueprint(message_bp)
app.register_blueprint(user_bp)
app.register_blueprint(Session_bp)
app.register_blueprint(Payment_bp)
app.register_blueprint(notification_bp)
app.register_blueprint(Review_bp)
app.register_blueprint(mentor_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(paypal_bp)
app.register_blueprint(assignments_bp)

# Serve uploaded mentor images from 'static/uploads/mentors'
@app.route('/static/uploads/mentors/<filename>')
def uploaded_mentor_image(filename):
    return send_from_directory('static/uploads/mentors', filename)

# JWT token blocklist check
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None
