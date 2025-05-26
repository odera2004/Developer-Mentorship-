import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import PaypalButton from "../components/PaypalButton";

const MentorProfileModal = ({
  isOpen,
  onClose,
  mentor,
  onAssignSuccess,
  onEdit,
  onDelete,
  isCurrentMentor,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!mentor) return null;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/token", {
        phone,
        amount: mentor.hourly_rate, // dynamically use mentor's set rate
      });
  
      alert("STK Push sent. Complete payment on your phone.");
      onAssignSuccess(mentor.id); // notify parent
      setShowPaymentModal(false);
      onClose();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />

        <div className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl max-w-md mx-auto p-8 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-300">
          <div className="flex flex-col items-center">
          <img
  src={
    mentor.image_url?.startsWith("http")
      ? mentor.image_url
      : `http://localhost:5001${mentor.image_url}`
  }
  alt={mentor.username}
  className="w-24 h-24 rounded-full object-cover mb-4 shadow-md"
/>


            <h2 className="text-2xl font-bold mb-1 dark:text-white text-gray-800">{mentor.username}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-2">{mentor.bio}</p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Skills: {Array.isArray(mentor.skills) ? mentor.skills.join(", ") : mentor.skills}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Experience: {mentor.experience} year{mentor.experience > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Rate: ${mentor.hourly_rate}/hr
            </p>

            <div className="flex flex-col gap-3 w-full mt-4">
              <button
                onClick={() => setShowPaymentModal(true)}
                className="w-full px-4 py-2 font-semibold bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Assign Mentor
              </button>

              {!isCurrentMentor && (
                <button
                  onClick={() => onEdit(mentor)}
                  className="w-full px-4 py-2 font-semibold bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                >
                  Edit Mentor
                </button>
              )}

              {!isCurrentMentor && (
                <button
                  onClick={() => onDelete(mentor)}
                  className="w-full px-4 py-2 font-semibold bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                >
                  Delete My Profile
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PAYMENT MODAL */}
        {showPaymentModal && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          placeholder="Phone (07xxxxxxxx)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <p className="mb-3 text-gray-800">
          Amount to Pay: Ksh {mentor.hourly_rate}
        </p>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay & Assign"}
        </button>
      </form>

      {/* ✅ Move PayPal outside the <form> to prevent duplication on input change */}
      <div className="my-4">
        <PaypalButton
          amount={mentor.hourly_rate}
          onSuccess={() => {
            alert("PayPal payment successful!");
            onAssignSuccess(mentor.id);
            setShowPaymentModal(false);
            onClose();
          }}
        />
      </div>

      <button
        onClick={() => setShowPaymentModal(false)}
        type="button"
        className="mt-2 w-full text-gray-500"
      >
        Cancel
      </button>
    </div>
  </div>
)}


      </div>
    </Dialog>
  );
};

export default MentorProfileModal;
