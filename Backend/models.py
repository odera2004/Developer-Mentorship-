from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()

class User(db.Model):  # For Flask-SQLAlchemy
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    Role = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.Enum('mentor', 'mentee', name='user_type_enum'), nullable=False)
    profile_picture = db.Column(db.String(255), default='default.png')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Mentor-specific fields
    skills = db.Column(db.Text)  # Comma-separated list
    experience = db.Column(db.String(255))
    availability = db.Column(db.Text)  # JSON structure: {'monday': '9AM-5PM', 'tuesday': '10AM-4PM'}

    # Mentee-specific fields
    selected_mentor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Reference mentor

    # Relationships
    mentor = db.relationship('User', remote_side=[id])  # Self-referential relationship


class Mentorship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.Enum('pending', 'accepted', 'rejected'), default='pending')
    payment_status = db.Column(db.Enum('pending', 'completed'), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    mentee = db.relationship('User', foreign_keys=[mentee_id])
    mentor = db.relationship('User', foreign_keys=[mentor_id])

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.Enum('pending', 'completed', 'failed'), default='pending')
    transaction_id = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    mentee = db.relationship('User', foreign_keys=[mentee_id])
    mentor = db.relationship('User', foreign_keys=[mentor_id])


class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mentor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message_text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


class CodeReview(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mentee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    code_snippet = db.Column(db.Text, nullable=False)
    feedback = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mentor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    mentee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    session_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum('scheduled', 'completed', 'canceled'), default='scheduled')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

