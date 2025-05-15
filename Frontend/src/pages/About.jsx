import React from "react";

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About DevConnect</h1>
        <p className="text-lg mb-4">
          DevConnect is a mentorship platform created to bridge the gap between aspiring developers and seasoned industry professionals. We believe that learning is a journey best taken with guidance.
        </p>
        <p className="text-lg mb-4">
          Whether you're just starting out or looking to sharpen your skills, DevConnect connects you with mentors who are passionate about helping you grow through personalized guidance, code reviews, and career insights.
        </p>
        <p className="text-lg">
          Our mission is simple: empower developers at every stage of their career by creating a strong, supportive, and collaborative tech community.
        </p>
      </div>
    </div>
  );
};

export default About;

