from flask import Blueprint, request, jsonify, abort
from app import db
from models import Notification

notification_bp = Blueprint("notification_bp", __name__)

# Create a new notification
@notification_bp.route('/notifications', methods=['POST'])
def create_notification():
    data = request.get_json()
    notification = Notification(
        user_id=data['user_id'],
        actor_id=data['actor_id'],
        message=data['message'],
        type=data['type'],
        is_read=data.get('is_read', False)
    )
    db.session.add(notification)
    db.session.commit()
    return jsonify({'message': 'Notification created successfully', 'id': notification.id}), 201

# Get a specific notification
@notification_bp.route('/notifications/<int:notification_id>', methods=['GET'])
def get_notification(notification_id):
    notification = Notification.query.get(notification_id)
    if not notification:
        abort(404, description='Notification not found')
    return jsonify({
        'id': notification.id,
        'user_id': notification.user_id,
        'actor_id': notification.actor_id,
        'message': notification.message,
        'type': notification.type,
        'is_read': notification.is_read,
        'created_at': notification.created_at
    })

# Get all notifications for a user
@notification_bp.route('/notifications', methods=['GET'])
def get_user_notifications():
    user_id = request.args.get('user_id')
    if not user_id:
        abort(400, description='User ID is required')
    
    notifications = Notification.query.filter_by(user_id=user_id).all()
    notifications_data = [{
        'id': n.id,
        'user_id': n.user_id,
        'actor_id': n.actor_id,
        'message': n.message,
        'type': n.type,
        'is_read': n.is_read,
        'created_at': n.created_at
    } for n in notifications]
    
    return jsonify(notifications_data)

# Update a notification (e.g., mark as read)
@notification_bp.route('/notifications/<int:notification_id>', methods=['PUT'])
def update_notification(notification_id):
    data = request.get_json()
    notification = Notification.query.get(notification_id)
    if not notification:
        abort(404, description='Notification not found')
    
    if 'is_read' in data:
        notification.is_read = data['is_read']
    
    db.session.commit()
    return jsonify({'message': 'Notification updated successfully'})

# Delete a notification
@notification_bp.route('/notifications/<int:notification_id>', methods=['DELETE'])
def delete_notification(notification_id):
    notification = Notification.query.get(notification_id)
    if not notification:
        abort(404, description='Notification not found')
    
    db.session.delete(notification)
    db.session.commit()
    return jsonify({'message': 'Notification deleted successfully'})
