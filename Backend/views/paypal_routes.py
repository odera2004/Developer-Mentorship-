import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

paypal_bp = Blueprint("paypal", __name__)

PAYPAL_CLIENT_ID = os.getenv("PAYPAL_CLIENT_ID")
PAYPAL_SECRET = os.getenv("PAYPAL_SECRET")
PAYPAL_BASE_URL = os.getenv("PAYPAL_BASE_URL")

def get_access_token():
    response = requests.post(
        f"{PAYPAL_BASE_URL}/v1/oauth2/token",
        headers={"Accept": "application/json"},
        data={"grant_type": "client_credentials"},
        auth=(PAYPAL_CLIENT_ID, PAYPAL_SECRET)
    )
    return response.json()["access_token"]

@paypal_bp.route("/verify-payment", methods=["POST"])
def verify_payment():
    data = request.get_json()
    order_id = data.get("orderID")

    if not order_id:
        return jsonify({"error": "Missing order ID"}), 400

    try:
        access_token = get_access_token()

        # Verify the order details
        res = requests.get(
            f"{PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {access_token}"
            }
        )
        order_data = res.json()

        if order_data["status"] == "COMPLETED":
            # Extract details like amount, payer email, etc.
            payer_email = order_data["payer"]["email_address"]
            amount = order_data["purchase_units"][0]["amount"]["value"]
            currency = order_data["purchase_units"][0]["amount"]["currency_code"]

            # ✅ Proceed with saving the transaction or assignment
            return jsonify({
                "status": "success",
                "message": "Payment verified",
                "amount": amount,
                "payer_email": payer_email,
                "currency": currency
            }), 200
        else:
            return jsonify({"error": "Payment not completed"}), 400

    except Exception as e:
        print("Error verifying payment:", e)
        return jsonify({"error": "Failed to verify payment"}), 500
