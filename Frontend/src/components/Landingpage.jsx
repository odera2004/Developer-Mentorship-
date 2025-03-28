import React, { useState, useEffect } from "react";
import { BsFillMoonStarsFill, BsSunFill, BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { FaCode, FaRocket, FaHandshake } from "react-icons/fa";
import { IoLogoJavascript, IoLogoPython, IoLogoReact } from "react-icons/io5";
import { SiTypescript, SiDjango, SiNodedotjs } from "react-icons/si";

const Landingpage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mentors = [
    {
      name: "Sarah Johnson",
      role: "Senior Software Engineer",
      expertise: "Frontend Development",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      company: "Tech Giants Inc."
    },
    {
      name: "Michael Chen",
      role: "Tech Lead",
      expertise: "Backend Architecture",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      company: "InnovateFlow"
    },
    {
      name: "Emily Rodriguez",
      role: "Full Stack Developer",
      expertise: "Cloud Solutions",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      company: "CloudScale"
    }
  ];

  const testimonials = [
    {
      text: "The mentorship program transformed my career trajectory completely!",
      author: "Alex Thompson",
      role: "Junior Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    {
      text: "Finding a mentor here was the best career decision I've made.",
      author: "Lisa Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    }
  ];

  const plans = [
    {
      title: "Basic",
      price: "$49",
      features: ["1 Monthly Session", "Email Support", "Resource Library Access"],
      popular: false
    },
    {
      title: "Pro",
      price: "$99",
      features: ["2 Monthly Sessions", "Priority Support", "1-1 Code Reviews", "Career Guidance"],
      popular: true
    },
    {
      title: "Enterprise",
      price: "$199",
      features: ["4 Monthly Sessions", "24/7 Support", "Custom Learning Path", "Project Mentoring"],
      popular: false
    }
  ];

  return (
    <div className={`${darkMode ? "dark bg-gray-900" : "bg-white"}`}>
      <div className="min-h-screen">


        {/* Hero Section */}
        <section className="pt-20 pb-32 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Accelerate Your Dev Career
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Connect with experienced mentors who've walked the path you're on
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50">
                Find a Mentor
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-blue-600">
                Become a Mentor
              </button>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <FaCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 dark:text-white">Expert Guidance</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn from experienced developers who know the industry inside out
                </p>
              </div>
              <div className="text-center p-6">
                <FaRocket className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 dark:text-white">Career Growth</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Accelerate your career with personalized development plans
                </p>
              </div>
              <div className="text-center p-6">
                <FaHandshake className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 dark:text-white">Network Building</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with a community of like-minded developers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Mentors */}
        <section className="py-20 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
              Meet Our Mentors
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">{mentor.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{mentor.role}</p>
                    <p className="text-blue-600 dark:text-blue-400">{mentor.expertise}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {mentor.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
              Mentorship Plans
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 ${plan.popular ? "ring-2 ring-blue-500" : ""}`}
                >
                  {plan.popular && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mt-4 dark:text-white">{plan.title}</h3>
                  <p className="text-4xl font-bold mt-4 mb-6 dark:text-white">{plan.price}</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center dark:text-gray-300">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full mt-8 px-4 py-2 rounded-lg font-medium ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"}`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">DevMentor</h3>
                <p className="text-gray-400">Empowering developers through mentorship</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Programs</a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">Mentors</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <BsLinkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                  <BsTwitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                  <BsGithub className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-l-lg w-full"
                  />
                  <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400">&copy; 2024 DevMentor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landingpage;