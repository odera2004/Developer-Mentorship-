import os
from flask import Blueprint, request, jsonify, abort
from werkzeug.utils import secure_filename
from app import db
from models import Mentor

mentor_bp = Blueprint("mentor_bp", __name__)

# Configurations for local image upload
UPLOAD_FOLDER = 'static/uploads/mentors'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#create mentor
@mentor_bp.route('/mentors', methods=['POST'])
def create_mentor():
    data = request.form
    image = request.files.get('image')

    # Ensure user_id is provided
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    # Verify that user exists
    from models import User  # Import here if not global
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Optional: Check that user is not already a mentor
    if user.mentor:
        return jsonify({'error': 'User is already registered as a mentor'}), 400

    image_url = None
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        image.save(image_path)
        image_url = f"/static/uploads/mentors/{filename}"  # ✅ correct


    # Convert comma-separated string to list if needed
    skills_str = data.get('skills')
    skills = [s.strip() for s in skills_str.split(',')] if skills_str else []

    new_mentor = Mentor(
        user_id=user_id,
        username=data.get('username'),
        bio=data.get('bio'),
        skills=skills,
        experience=int(data.get('experience')) if data.get('experience') else None,
        hourly_rate=float(data.get('hourly_rate')) if data.get('hourly_rate') else None,
        image_url=image_url
    )

    db.session.add(new_mentor)
    db.session.commit()

    return jsonify({"message": "Mentor created", "mentor": new_mentor.to_dict()}), 201

# Fetch all mentors
@mentor_bp.route('/mentors', methods=['GET'])
def get_all_mentors():
    mentors = Mentor.query.all()
    return jsonify([mentor.to_dict() for mentor in mentors])

# Fetch individual mentor
@mentor_bp.route('/mentors/<int:mentor_id>', methods=['GET'])
def get_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    return jsonify(mentor.to_dict())

# Update mentor
@mentor_bp.route('/mentors/<int:mentor_id>', methods=['PUT'])
def update_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')

    data = request.get_json()
    mentor.bio = data.get('bio', mentor.bio)
    mentor.skills = data.get('skills', mentor.skills)
    mentor.experience = data.get('experience', mentor.experience)
    mentor.hourly_rate = data.get('hourly_rate', mentor.hourly_rate)

    db.session.commit()
    return jsonify({'message': 'Mentor updated successfully'})

# Delete mentor
@mentor_bp.route('/mentors/<int:mentor_id>', methods=['DELETE'])
def delete_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    db.session.delete(mentor)
    db.session.commit()
    return jsonify({'message': 'Mentor deleted successfully'})
