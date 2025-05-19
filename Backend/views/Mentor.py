import os
from flask import Blueprint, request, jsonify, abort
from werkzeug.utils import secure_filename
from app import db
from models import Mentor
import cloudinary.uploader

mentor_bp = Blueprint("mentor_bp", __name__)

# Configurations for image upload
UPLOAD_FOLDER = 'static/uploads/mentors'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Mentor CRUD Operations
@mentor_bp.route('/mentors', methods=['POST'])
def create_mentor():
    data = request.form
    image = request.files.get('image')

    if image:
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result['secure_url']
    else:
        image_url = None

    new_mentor = Mentor(
        username=data.get('username'),
        bio=data.get('bio'),
        skills=data.get('skills'),  # maybe serialize if it's a list
        experience=data.get('experience'),
        hourly_rate=data.get('hourly_rate'),
        image_url=image_url  # store Cloudinary image URL here
    )

    db.session.add(new_mentor)
    db.session.commit()

    return jsonify({"message": "Mentor created", "mentor": new_mentor.to_dict()}), 201


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



# import cloudinary.uploader
# from flask import Blueprint, request, jsonify, abort
# from models import db, Mentor

# mentor_bp = Blueprint("mentor_bp", __name__)

# # -------------------------------
# # ✅ Create a mentor (with Cloudinary image)
# # -------------------------------
# @mentor_bp.route('/mentors', methods=['POST'])
# def create_mentor():
#     data = request.form
#     image = request.files.get('image')

#     image_url = None
#     if image:
#         upload_result = cloudinary.uploader.upload(image)
#         image_url = upload_result['secure_url']

#     new_mentor = Mentor(
#         username=data.get('username'),
#         bio=data.get('bio'),
#         skills=data.get('skills'),
#         experience=data.get('experience'),
#         hourly_rate=data.get('hourly_rate'),
#         image_url=image_url
#     )

#     db.session.add(new_mentor)
#     db.session.commit()

#     return jsonify({"message": "Mentor created", "mentor": new_mentor.to_dict()}), 201

# # -------------------------------
# # ✅ Get all mentors
# # -------------------------------
# @mentor_bp.route('/mentors', methods=['GET'])
# def get_all_mentors():
#     mentors = Mentor.query.all()
#     return jsonify([mentor.to_dict() for mentor in mentors])

# # -------------------------------
# # ✅ Get individual mentor
# # -------------------------------
# @mentor_bp.route('/mentors/<int:mentor_id>', methods=['GET'])
# def get_mentor(mentor_id):
#     mentor = Mentor.query.get_or_404(mentor_id)
#     return jsonify(mentor.to_dict())

# # -------------------------------
# # ✅ Update a mentor (with optional new image)
# # -------------------------------
# @mentor_bp.route('/mentors/<int:mentor_id>', methods=['PUT'])
# def update_mentor(mentor_id):
#     mentor = Mentor.query.get_or_404(mentor_id)
#     data = request.form
#     image = request.files.get('image')

#     if image:
#         upload_result = cloudinary.uploader.upload(image)
#         mentor.image_url = upload_result['secure_url']

#     mentor.bio = data.get('bio', mentor.bio)
#     mentor.skills = data.get('skills', mentor.skills)
#     mentor.experience = data.get('experience', mentor.experience)
#     mentor.hourly_rate = data.get('hourly_rate', mentor.hourly_rate)

#     db.session.commit()
#     return jsonify({'message': 'Mentor updated successfully', 'mentor': mentor.to_dict()})

# # -------------------------------
# # ✅ Delete a mentor
# # -------------------------------
# @mentor_bp.route('/mentors/<int:mentor_id>', methods=['DELETE'])
# def delete_mentor(mentor_id):
#     mentor = Mentor.query.get_or_404(mentor_id)
#     db.session.delete(mentor)
#     db.session.commit()
#     return jsonify({'message': 'Mentor deleted successfully'})
