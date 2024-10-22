import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Use the AuthContext

const LoginForm = () => {
  const { login } = useAuth(); // Access the login function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password cannot be empty");
      return;
    }

    // Clear any previous errors
    setError("");

    // Simulate successful login by storing user data in AuthContext
    login({ email }); // Store email in the AuthContext for later use

    // Redirect to home page after successful login
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softBlue sm:mt-20">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform hover:scale-105 transition duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Login</h2>

        {error && <div className="bg-red-500 text-white p-2 mb-4 text-center rounded">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email:</label>
            <input 
              type="email" 
              id="email" 
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">Password:</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="absolute inset-y-0 right-0 px-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="bg-blue-500 text-white font-semibold rounded-lg py-2 px-4 w-full hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/registrationForm" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
