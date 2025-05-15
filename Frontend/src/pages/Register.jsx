import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import GoogleLoginButton from '../components/GoogleLoginButton'; 
import { toast } from 'react-toastify';

export default function Register() {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone_number, setPhone_Number] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await register(username, email, password, "mentee", phone_number);
      toast.success("Registration successful");
      navigate('/login');
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-indigo-600 mb-6">Create an Account</h2>

        {/* ✅ Google Login Button */}
        <GoogleLoginButton />

        <div className="my-4 text-center text-sm text-gray-400">— OR —</div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label text-sm text-gray-600 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control rounded-md w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label text-sm text-gray-600 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-md w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label text-sm text-gray-600 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-md w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="repeatPassword" className="form-label text-sm text-gray-600 font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="form-control rounded-md w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Repeat Password"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="form-label text-sm text-gray-600 font-semibold">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phone_number}
              onChange={(e) => setPhone_Number(e.target.value)}
              className="form-control rounded-md w-full py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Phone Number"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
