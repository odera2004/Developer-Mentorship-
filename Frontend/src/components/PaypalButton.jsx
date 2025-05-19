import React, { useEffect, useRef } from "react";

const PaypalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();

  useEffect(() => {
    // Clear container to avoid multiple button renders
    if (paypalRef.current) {
      paypalRef.current.innerHTML = ""; // 💥 This is the real fix
    }

    // Load PayPal script and render the button
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const details = await actions.order.capture();
        console.log("Payment Successful:", details);
        onSuccess(details);
      },
    }).render(paypalRef.current);
  }, [amount]); // only rerender if amount changes

  return <div ref={paypalRef}></div>;
};

export default PaypalButton;
