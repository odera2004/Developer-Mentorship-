import React, { useState, useEffect, useContext } from "react";
import BecomeMentorModal from "./BecomeMentorModal";
import MentorList from "./MentorList"; // ✅ import the MentorList component
import { MentorContext } from "../context/MentorContext";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);

  const { mentors, fetchMentors } = useContext(MentorContext);
  const currentUserId = 1; // 🔥 Replace this with the real logged-in user ID dynamically later

  useEffect(() => {
    fetchMentors(); // ✅ Fetch mentors on mount
  }, []);

  const handleMentorAdded = () => {
    fetchMentors(); // ✅ Refresh mentor list when one is added
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
      <div className="min-h-screen">
        {/* Hero Section */}
       <section className="pt-20 pb-32 bg-white text-center border-b border-gray-200">
  <div className="max-w-4xl mx-auto px-4">
    <h1 className="text-5xl font-serif font-bold text-gray-800 mb-6">
      Accelerate Your Dev Career
    </h1>
    <p className="text-lg text-gray-600 mb-8">
      Connect with experienced mentors who've walked the path you're on
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <button className="px-6 py-3 border border-gray-800 text-gray-800 rounded hover:bg-gray-100">
        Find a Mentor
      </button>
      <button
        onClick={() => setIsMentorModalOpen(true)}
        className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Become a Mentor
      </button>
      <BecomeMentorModal
  isOpen={isMentorModalOpen}
  onClose={() => setIsMentorModalOpen(false)}
  userId={currentUserId}
  onMentorAdded={handleMentorAdded}
/>

    </div>
  </div>
</section>


        {/* Featured Mentors */}
        <section className="py-20 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
              Meet Our Mentors
            </h2>

            {mentors.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500 dark:text-gray-300">
                No mentors available yet.
              </p>
            ) : (
              <MentorList mentors={mentors} currentUserId={currentUserId} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
