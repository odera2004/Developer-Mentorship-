import React, { useEffect, useRef, useState } from 'react';

const PaypalButton = ({ amount, onSuccess }) => {
  const paypalRef = useRef();
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.paypal) {
        setSdkReady(true);
        clearInterval(interval);
      }
    }, 100); // Check every 100ms until loaded

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (sdkReady) {
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          console.log('Payment approved:', details);
          onSuccess();
        },
        onError: (err) => {
          console.error('PayPal Error:', err);
          alert("PayPal payment failed. Try again.");
        },
      }).render(paypalRef.current);
    }
  }, [sdkReady, amount, onSuccess]);

  return (
    <div>
      {!sdkReady && <p className="text-sm text-gray-500 text-center">Loading PayPal...</p>}
      <div ref={paypalRef} />
    </div>
  );
};

export default PaypalButton;
