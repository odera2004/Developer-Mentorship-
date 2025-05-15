from flask import Blueprint, request, jsonify
from models import db, MentorAssignment  # Assuming this model exists
from flask_jwt_extended import jwt_required, get_jwt_identity

assignments_bp = Blueprint('assignments', __name__)

@assignments_bp.route('/assign_mentor', methods=['POST'])
@jwt_required()
def assign_mentor():
    data = request.get_json()
    user_id = get_jwt_identity()
    mentor_id = data.get('mentor_id')

    if not mentor_id:
        return jsonify({"error": "Mentor ID is required"}), 400

    # Optional: Check if already assigned
    existing = MentorAssignment.query.filter_by(user_id=user_id, mentor_id=mentor_id).first()
    if existing:
        return jsonify({"message": "Already assigned to this mentor"}), 200

    new_assignment = MentorAssignment(user_id=user_id, mentor_id=mentor_id)
    db.session.add(new_assignment)
    db.session.commit()

    return jsonify({"message": "Mentor assigned successfully"}), 201
