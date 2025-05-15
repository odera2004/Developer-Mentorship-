import React from "react";
import { FaChalkboardTeacher, FaUserFriends, FaCodeBranch } from "react-icons/fa";

const Services = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <FaChalkboardTeacher className="text-blue-600 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">1-on-1 Mentorship</h3>
            <p>
              Personalized mentoring sessions with experienced developers tailored to your goals and skill level.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <FaCodeBranch className="text-blue-600 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Code Reviews</h3>
            <p>
              Upload code snippets or projects and get detailed feedback from experts to improve your skills.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
            <FaUserFriends className="text-blue-600 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Community Forum</h3>
            <p>
              Collaborate, ask questions, and share insights with other developers and mentors in our discussion hub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
