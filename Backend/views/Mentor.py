from flask import Blueprint, request, jsonify, abort
from app import db
from models import  Mentor

mentor_bp = Blueprint("mentor_bp", __name__)

# Mentor CRUD Operations
@mentor_bp.route('/mentors', methods=['POST'])
def create_mentor():
    data = request.get_json()
    mentor = Mentor(
        user_id=data['user_id'],
        username=data['username'],
        bio=data['bio'],
        skills=data['skills'],
        experience=data['experience'],
        hourly_rate=data['hourly_rate'],
        availability=data['availability']
    )
    db.session.add(mentor)
    db.session.commit()
    return jsonify({'message': 'Mentor created successfully', 'id': mentor.id}), 201

@mentor_bp.route('/mentors/<int:mentor_id>', methods=['GET'])
def get_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    return jsonify(mentor.to_dict())

@mentor_bp.route('/mentors/<int:mentor_id>', methods=['PUT'])
def update_mentor(mentor_id):
    data = request.get_json()
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    mentor.bio = data.get('bio', mentor.bio)
    mentor.skills = data.get('skills', mentor.skills)
    db.session.commit()
    return jsonify({'message': 'Mentor updated successfully'})

@mentor_bp.route('/mentors/<int:mentor_id>', methods=['DELETE'])
def delete_mentor(mentor_id):
    mentor = Mentor.query.get(mentor_id)
    if not mentor:
        abort(404, description='Mentor not found')
    db.session.delete(mentor)
    db.session.commit()
    return jsonify({'message': 'Mentor deleted successfully'})
