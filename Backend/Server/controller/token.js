const axios = require("axios");

let token = ""; // Global token storage

// Step 1: Create OAuth Token Middleware
const createToken = async (req, res, next) => {
  const secret = "GS6UtU0AxLMclS4cbRhUypDySWN8rGCv43dvVEuZXyiNO3cGMq8hQl60i75wnGWG";
  const consumer = "wlwzPzbBizCEwrI0uNHqAXcPE6VixwH7Fm9zZSfiaSyLqxSq";

  const auth = Buffer.from(`${consumer}:${secret}`).toString("base64");

  try {
    const { data } = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    token = data.access_token;
    console.log("Access Token:", token);
    next();
  } catch (err) {
    console.error("Token generation failed:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// Step 2: STK Push Request Handler
const stkPush = async (req, res) => {
  const shortCode = 174379;
  const phone = req.body.phone.substring(1); // Remove leading 0
  const amount = req.body.amount;
  const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
  const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

  const stkPayload = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: `254${phone}`,
    PartyB: shortCode,
    PhoneNumber: `254${phone}`,
    CallBackURL: "https://mydomain.com/path", // Replace with your ngrok/real callback URL
    AccountReference: "Mpesa Test",
    TransactionDesc: "Testing stk push",
  };

  try {
    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("STK Response:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error("STK Push failed:", err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createToken, stkPush };
