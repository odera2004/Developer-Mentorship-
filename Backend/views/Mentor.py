import os
from flask import Blueprint, request, jsonify, abort
from werkzeug.utils import secure_filename
from app import db
from models import Mentor

mentor_bp = Blueprint("mentor_bp", __name__)

# Configurations for image upload
UPLOAD_FOLDER = 'static/uploads/mentors'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Mentor CRUD Operations

@mentor_bp.route('/mentors', methods=['POST'])
def create_mentor():
    data = request.form  # Get form data
    
    # Handle image upload
    file = request.files.get('image')
    image_url = None
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        upload_folder = os.path.join('static', 'uploads', 'mentors')
        os.makedirs(upload_folder, exist_ok=True)  # Ensure folder exists
        filepath = os.path.join(upload_folder, filename)
        file.save(filepath)
        image_url = f"/{filepath.replace(os.sep, '/')}"  # Normalize for URL

    # Create mentor instance
    mentor = Mentor(
        user_id=data['user_id'],
        username=data['username'],
        bio=data['bio'],
        skills=data['skills'].split(','),
        experience=int(data['experience']),
        hourly_rate=float(data['hourly_rate']),
        availability=data['availability'].split(','),
        image_url=image_url
    )
    
    db.session.add(mentor)
    db.session.commit()
    return jsonify({'message': 'Mentor created successfully', 'id': mentor.id}), 201

# Fetch individual mentor
@mentor_bp.route('/mentors/<int:mentor_id>', methods=['GET'])
def get_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    return jsonify(mentor.to_dict())

# Update mentor
@mentor_bp.route('/mentors', methods=['PUT'])
def update_mentor(mentor_id):
    data = request.get_json()
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    mentor.bio = data.get('bio', mentor.bio)
    mentor.skills = data.get('skills', mentor.skills)
    db.session.commit()
    return jsonify({'message': 'Mentor updated successfully'})

# Delete mentor
@mentor_bp.route('/mentors', methods=['DELETE'])
def delete_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    db.session.delete(mentor)
    db.session.commit()
    return jsonify({'message': 'Mentor deleted successfully'})

# Fetch all mentors
@mentor_bp.route('/mentors', methods=['GET'])
def get_all_mentors():
    mentors = Mentor.query.all()
    return jsonify([mentor.to_dict() for mentor in mentors])  # Assuming you have to_dict method on Mentor
