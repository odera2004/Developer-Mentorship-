from flask import Blueprint, request, jsonify, abort
from app import db
from models import Message

message_bp = Blueprint('message_bp', __name__)

# Create a new message
@message_bp.route('/messages', methods=['POST'])
def create_message():
    data = request.get_json()
    sender_id = data.get('sender_id')
    receiver_id = data.get('receiver_id')
    session_id = data.get('session_id')
    content = data.get('content')

    if not sender_id or not receiver_id or not content:
        abort(400, description="Missing required fields.")

    # Create new message instance
    message = Message(sender_id=sender_id, receiver_id=receiver_id, 
                      session_id=session_id, content=content)

    db.session.add(message)
    db.session.commit()

    return jsonify({"message": "Message created successfully!", "id": message.id}), 201

# Get all messages for a user
@message_bp.route('/messages', methods=['GET'])
def get_messages():
    user_id = request.args.get('user_id')

    if not user_id:
        abort(400, description="User ID is required.")

    # Retrieve messages for the user (both sent and received)
    sent_messages = Message.query.filter_by(sender_id=user_id).all()
    received_messages = Message.query.filter_by(receiver_id=user_id).all()

    # Manually create lists of dictionaries for sent and received messages
    sent_messages_data = [{
        'id': message.id,
        'sender_id': message.sender_id,
        'receiver_id': message.receiver_id,
        'session_id': message.session_id,
        'content': message.content,
        'timestamp': message.timestamp,
        'is_read': message.is_read
    } for message in sent_messages]

    received_messages_data = [{
        'id': message.id,
        'sender_id': message.sender_id,
        'receiver_id': message.receiver_id,
        'session_id': message.session_id,
        'content': message.content,
        'timestamp': message.timestamp,
        'is_read': message.is_read
    } for message in received_messages]

    return jsonify({
        "sent_messages": sent_messages_data,
        "received_messages": received_messages_data
    })

# Get a specific message
@message_bp.route('/messages/<int:message_id>', methods=['GET'])
def get_message(message_id):
    message = Message.query.get(message_id)
    if not message:
        abort(404, description="Message not found.")

    # Manually convert message to a dictionary
    message_data = {
        'id': message.id,
        'sender_id': message.sender_id,
        'receiver_id': message.receiver_id,
        'session_id': message.session_id,
        'content': message.content,
        'timestamp': message.timestamp,
        'is_read': message.is_read
    }

    return jsonify(message_data)

# Update a message (e.g., mark as read)
@message_bp.route('/messages/<int:message_id>', methods=['PUT'])
def update_message(message_id):
    data = request.get_json()
    message = Message.query.get(message_id)

    if not message:
        abort(404, description="Message not found.")

    # Update the fields if they are provided
    if 'content' in data:
        message.content = data['content']
    if 'is_read' in data:
        message.is_read = data['is_read']

    db.session.commit()

    return jsonify({"message": "Message updated successfully!"})

# Delete a message
@message_bp.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    message = Message.query.get(message_id)
    if not message:
        abort(404, description="Message not found.")
    
    db.session.delete(message)
    db.session.commit()

    return jsonify({"message": "Message deleted successfully!"})
