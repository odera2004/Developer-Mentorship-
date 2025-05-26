import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

// Create Context
export const MentorContext = createContext();

// Provider
export const MentorProvider = ({ children }) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5000";

  // Fetch all mentors
  const fetchMentors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/mentors`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch mentors");
      setMentors(data); // 💾 Update the context state
    } catch (err) {
      // console.error("Fetch mentors error:", err);
      toast.error("Unable to load mentors");
    } finally {
      setLoading(false);
    }
  };

  // Create Mentor (with image upload)
  const createMentor = async (formData) => {
    try {
      toast.loading("Creating mentor profile...");
      const response = await fetch(`${BASE_URL}/mentors`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      toast.dismiss();

      if (!response.ok) throw new Error(data.error || "Failed to create mentor");

      toast.success("Mentor profile created!");

      // 🆕 Optionally update the mentor list instantly
      setMentors((prev) => [...prev, data]);

      return data;
    } catch (err) {
      toast.dismiss();
      console.error("Create mentor error:", err);
      throw err;
    }
  };

  // Get a Single Mentor by ID
  const getMentor = async (mentorId) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/mentors/${mentorId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch mentor");
      return data;
    } catch (err) {
      console.error("Get mentor error:", err);
      toast.error("Failed to load mentor profile");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Update a Mentor
  const updateMentor = async (mentorId, updates) => {
    try {
      toast.loading("Updating mentor profile...");
      const response = await fetch(`${BASE_URL}/mentors/${mentorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      toast.dismiss();

      if (!response.ok) throw new Error(data.error || "Failed to update mentor");

      toast.success("Mentor profile updated!");

      // Optional: update the mentors array in state
      setMentors((prev) =>
        prev.map((mentor) => (mentor.id === mentorId ? data : mentor))
      );

      return data;
    } catch (err) {
      console.error("Update mentor error:", err);
      toast.dismiss();
      toast.error("Failed to update mentor profile");
      return null;
    }
  };

  // Delete a Mentor
  const deleteMentor = async (mentorId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this mentor?");
      if (!confirmed) return;

      toast.loading("Deleting mentor...");
      const response = await fetch(`${BASE_URL}/mentors/${mentorId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      toast.dismiss();

      if (!response.ok) throw new Error(data.error || "Failed to delete mentor");

      toast.success("Mentor deleted successfully!");

      // 🔥 Remove from local state
      setMentors((prev) => prev.filter((mentor) => mentor.id !== mentorId));

      return true;
    } catch (err) {
      console.error("Delete mentor error:", err);
      toast.dismiss();
      toast.error("Failed to delete mentor");
      return false;
    }
  };

  const value = {
    createMentor,
    getMentor,
    updateMentor,
    deleteMentor,
    fetchMentors, // ⬅️ exposed to the rest of the app
    mentors,
    setMentors,   // ⬅️ exposed in case a component wants to manually adjust it
    loading,
  };

  return <MentorContext.Provider value={value}>{children}</MentorContext.Provider>;
};

// Custom hook for easy access
export const useMentor = () => useContext(MentorContext);
