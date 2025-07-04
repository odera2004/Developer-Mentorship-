from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from datetime import datetime
from sqlalchemy.dialects.sqlite import JSON 


metadata = MetaData()
db = SQLAlchemy(metadata=metadata)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(512), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # "developer" or "mentor"
    isadmin = db.Column(db.Boolean, default=False, nullable=True)
    phone_number = db.Column(db.String(15), unique=True, nullable=True)  # New field added
    is_google_account = db.Column(db.Boolean, default=False)

    
    
    mentor = db.relationship('Mentor', backref='user', uselist=False, cascade='all, delete-orphan')


class Mentor(db.Model):
    __tablename__ = 'mentors'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Add ForeignKey here
    username = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text, nullable=True)
    skills = db.Column(JSON, nullable=True) 
    experience = db.Column(db.Integer, nullable=True)
    hourly_rate = db.Column(db.Float, nullable=True)
    availability = db.Column(JSON, nullable=True)
    image_url = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.username,
            'bio': self.bio,
            'skills': self.skills,
            'experience': self.experience,
            'hourly_rate': self.hourly_rate,
            'availability': self.availability,
            'image_url': self.image_url
        }

    # Relationships
    sessions = db.relationship('Session', backref='mentor', cascade='all, delete-orphan')

class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    developer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentors.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # Duration in minutes
    status = db.Column(db.String(50), nullable=False)  # "pending", "accepted", "completed", "cancelled"
    payment_status = db.Column(db.String(50), nullable=False)  # "pending", "paid", "refunded"

    # Relationships
    messages = db.relationship('Message', backref='session', cascade='all, delete-orphan')
    payment = db.relationship('Payment', backref='session', uselist=False, cascade='all, delete-orphan')
    review = db.relationship('Review', backref='session', uselist=False, cascade='all, delete-orphan')



class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'), nullable=True)  # Optional
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    is_read = db.Column(db.Boolean, default=False)

    # Relationships
    sender = db.relationship('User', foreign_keys=[sender_id], backref='sent_messages')
    receiver = db.relationship('User', foreign_keys=[receiver_id], backref='received_messages')



class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(50), nullable=False)  # e.g., "Stripe", "PayPal"
    transaction_id = db.Column(db.String(120), nullable=False)  # Unique ID from payment gateway
    status = db.Column(db.String(50), nullable=False)  # "pending", "success", "failed"
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('session.id'), nullable=False)
    developer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('mentors.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # Rating from 1 to 5
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())



class MentorAssignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    mentor_id = db.Column(db.Integer, nullable=False)
    assigned_at = db.Column(db.DateTime, default=datetime.utcnow)



class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # The recipient
    actor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # The user who performed the action
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), nullable=False)  # e.g., "session_request", "message", "payment"
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Explicit relationships to avoid ambiguity
    user = db.relationship('User', foreign_keys=[user_id], backref='notifications_received')  # Recipient
    actor = db.relationship('User', foreign_keys=[actor_id], backref='notifications_sent')  # Sender/Actor

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)