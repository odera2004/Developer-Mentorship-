import React from "react";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";


const Footer = () => {
    return ( 
        <div>
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
     );
}
 
export default Footer;