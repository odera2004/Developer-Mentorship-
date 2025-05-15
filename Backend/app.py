from flask import Flask
from flask_migrate import Migrate
from models import db,TokenBlocklist
from flask_cors import CORS
from datetime import timedelta
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
# init_oauth(app)


CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# migration initialization
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dev_db_6e9t_user:LYnDoEffC88zj4G6xX1QPrynlt8FjawK@dpg-d0j2gqali9vc73bf78fg-a.oregon-postgres.render.com/dev_db_6e9t'
migrate = Migrate(app, db)
db.init_app(app)

# Jwt
app.config["JWT_SECRET_KEY"] = "dgsjfgfgfeyyeyud" 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =  timedelta(hours=1)

jwt = JWTManager(app)
jwt.init_app(app)

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


# Callback function to check if a JWT exists in the database blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None
