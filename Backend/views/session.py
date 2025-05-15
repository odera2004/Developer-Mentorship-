from flask import Blueprint, request, jsonify, abort
from app import db
from models import  Session

Session_bp = Blueprint("Session_bp",__name__ )

# Session CRUD Operations
@Session_bp.route('/sessions', methods=['POST'])
def create_session():
    data = request.get_json()
    session = Session(
        developer_id=data['developer_id'],
        mentor_id=data['mentor_id'],
        date=data['date'],
        duration=data['duration'],
        status=data['status'],
        payment_status=data['payment_status']
    )
    db.session.add(session)
    db.session.commit()
    return jsonify({'message': 'Session created successfully', 'id': session.id}), 201

@Session_bp.route('/sessions/<int:session_id>', methods=['GET'])
def get_session(session_id):
    session = Session.query.get(session_id)
    if not session:
        abort(404, description='Session not found')
    return jsonify(session.to_dict())

@Session_bp.route('/sessions/<int:session_id>', methods=['PUT'])
def update_session(session_id):
    data = request.get_json()
    session = Session.query.get(session_id)
    if not session:
        abort(404, description='Session not found')
    session.status = data.get('status', session.status)
    session.payment_status = data.get('payment_status', session.payment_status)
    db.session.commit()
    return jsonify({'message': 'Session updated successfully'})

@Session_bp.route('/sessions/<int:session_id>', methods=['DELETE'])
def delete_session(session_id):
    session = Session.query.get(session_id)
    if not session:
        abort(404, description='Session not found')
    db.session.delete(session)
    db.session.commit()
    return jsonify({'message': 'Session deleted successfully'})