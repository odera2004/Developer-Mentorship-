import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 🧭 import useNavigate
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate(); // 🧭 create navigate function

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success("Successfully logged in")
      navigate('/'); // ✅ only navigate once user is fully loaded
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h3 className="text-center text-2xl font-bold text-indigo-600 mb-6">
          Welcome Back
        </h3>

        <div className="mb-4">
          <label htmlFor="email" className="form-label text-sm text-gray-600 font-semibold">
            Email
          </label>
          <input
            type="text"
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
            placeholder="Password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200"
        >
          Sign In
        </button>

        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
