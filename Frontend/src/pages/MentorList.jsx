import React, { useState } from "react";
import MentorProfileModal from "./MentorProfileModal";

const MentorList = ({ mentors, currentUserId }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (mentor) => {
    setSelectedMentor(mentor);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMentor(null);
    setModalOpen(false);
  };

  const handleAssign = (mentor) => {
    console.log("Assigning", mentor.username);
    closeModal();
  };

  const handleEdit = (mentor) => {
    console.log("Editing", mentor.username);
  };

  const handleDelete = (mentor) => {
    console.log("Deleting", mentor.username);
    closeModal();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mentors.map((mentor) => (
        <div
          key={mentor.id}
          className="bg-white shadow p-4 rounded hover:shadow-lg cursor-pointer"
          onClick={() => openModal(mentor)}
        >
          <img
            src={`http://localhost:5000${mentor.image_url}`}
            alt={mentor.username}
            className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
          />
          <h3 className="text-lg text-center font-bold">{mentor.username}</h3>

          {/* 👇 Safely show skills */}
          <p className="text-center text-gray-600">
            {Array.isArray(mentor.skills)
              ? mentor.skills.join(', ')
              : typeof mentor.skills === "string"
              ? mentor.skills
              : "No skills listed"}
          </p>
        </div>
      ))}

      {/* Modal */}
      <MentorProfileModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  mentor={selectedMentor}
  onAssignSuccess={(mentorId) => {
    // Do backend assignment or toast success
    console.log("Mentor assigned after payment:", mentorId);
  }}
  onEdit={handleEdit}
  onDelete={handleDelete}
  isCurrentMentor={false}
/>

    </div>
  );
};

export default MentorList;
