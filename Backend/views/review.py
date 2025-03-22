from flask import Blueprint, request, jsonify, abort
from app import db
from models import  Review

Review_bp = Blueprint("Review_bp", __name__)

# Review CRUD Operations
@Review_bp.route('/reviews', methods=['POST'])
def create_review():
    data = request.get_json()
    review = Review(
        session_id=data['session_id'],
        developer_id=data['developer_id'],
        mentor_id=data['mentor_id'],
        rating=data['rating'],
        comment=data.get('comment', '')
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review created successfully', 'id': review.id}), 201

@Review_bp.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        abort(404, description='Review not found')
    return jsonify(review.to_dict())

@Review_bp.route('/reviews/<int:review_id>', methods=['PUT'])
def update_review(review_id):
    data = request.get_json()
    review = Review.query.get(review_id)
    if not review:
        abort(404, description='Review not found')
    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    db.session.commit()
    return jsonify({'message': 'Review updated successfully'})

@Review_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        abort(404, description='Review not found')
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'})
