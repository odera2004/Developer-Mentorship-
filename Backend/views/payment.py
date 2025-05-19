from flask import Blueprint, request, jsonify, abort
from app import db
from models import Payment

Payment_bp = Blueprint('Payment_bp', __name__)

# Payment Payment Operations
@Payment_bp.route('/payments', methods=['POST'])
def create_payment():
    data = request.get_json()
    payment = Payment(
        session_id=data['session_id'],
        amount=data['amount'],
        payment_method=data['payment_method'],
        transaction_id=data['transaction_id'],
        status=data['status']
    )
    db.session.add(payment)
    db.session.commit()
    return jsonify({'message': 'Payment created successfully', 'id': payment.id}), 201

@Payment_bp.route('/payments/<int:payment_id>', methods=['GET'])
def get_payment(payment_id):
    payment = Payment.query.get(payment_id)
    if not payment:
        abort(404, description='Payment not found')
    return jsonify(payment.to_dict())

@Payment_bp.route('/payments/<int:payment_id>', methods=['PUT'])
def update_payment(payment_id):
    data = request.get_json()
    payment = Payment.query.get(payment_id)
    if not payment:
        abort(404, description='Payment not found')
    payment.status = data.get('status', payment.status)
    db.session.commit()
    return jsonify({'message': 'Payment updated successfully'})

@Payment_bp.route('/payments/<int:payment_id>', methods=['DELETE'])
def delete_payment(payment_id):
    payment = Payment.query.get(payment_id)
    if not payment:
        abort(404, description='Payment not found')
    db.session.delete(payment)
    db.session.commit()
    return jsonify({'message': 'Payment deleted successfully'})


@Payment_bp.route('/mpesa/callback', methods=['POST'])
def mpesa_callback():
    data = request.get_json()
    print("Callback received:", data)
    # process the transaction result here
    return jsonify({'message': 'Callback received'}), 200

