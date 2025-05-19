import React, { useState, useContext, useEffect } from "react";
import { MentorContext } from "../context/MentorContext";

const BecomeMentorModal = ({ isOpen, onClose, userId, onMentorAdded }) => {
  const { createMentor } = useContext(MentorContext);

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    skills: "",
    experience: "",
    hourly_rate: "",
    availability: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value ,files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("user_id", userId); // ← dynamically include logged-in user
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await createMentor(form);
      console.log("Mentor created!");
      onMentorAdded(); // ✅ refresh mentor list on Home page
      onClose();       // ✅ close modal
    } catch (err) {
      if (err.response && err.response.status === 409) {
      alert("You are already a mentor!");
    } else {
      console.error("Error submitting mentor form:", err);
      alert("Something went wrong. Please try again.");
    }
  }
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close (×) icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Become a Mentor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="bio"
            placeholder="Short Bio"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="experience"
            placeholder="Years of Experience"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="hourly_rate"
            placeholder="Hourly Rate ($)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g., Weekends)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2"
          />
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeMentorModal;
