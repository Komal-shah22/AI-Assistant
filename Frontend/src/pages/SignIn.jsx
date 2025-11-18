import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userdatacontext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 🔴 Error message state
  const { serverURL ,userData, setUserData} = useContext(userdatacontext);
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear old error
    // Basic validation
    if (!email || !password) {
      setErrorMessage("⚠️ Please fill all fields");
      return;
    }
    try {
      const response = await axios.post(
        `${serverURL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUserData(response.data); // Update user context
      console.log("✅ Login successful:", response.data);
      navigate("/"); // Redirect after login
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      setUserData(null);
      // Show backend error message in UI
      if (error.response && error.response.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignIn}
        className="bg-[#00000070] backdrop-blur p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full 
                   max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md 
                   transition-transform duration-300 hover:scale-[1.02]"
      >
        {/* Heading */}
        <h2 className="text-3xl sm:text-2xl font-bold text-center mb-8 text-white tracking-wide drop-shadow-md">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-white text-sm font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-full text-white placeholder-gray-300 
                       border border-gray-300 bg-transparent focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-white text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-full text-white placeholder-gray-300 
                       border border-gray-300 bg-transparent focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[36px] right-3 text-white"
          >
            {showPassword ? (
              <IoIosEyeOff className="w-6 h-6" />
            ) : (
              <IoIosEye className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-6">
          <a
            href="#"
            className="text-blue-300 hover:text-blue-400 text-sm font-medium underline transition-all"
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold 
                     hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-lg"
        >
          Sign In
        </button>

        {/* 🔴 Error Message */}
        {errorMessage && (
          <p className="text-red-400 text-center mt-4 font-medium animate-pulse">
            {errorMessage}
          </p>
        )}

        {/* Divider Line */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-400 opacity-40"></div>
          <span className="px-2 text-gray-300 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-400 opacity-40"></div>
        </div>

        {/* Google Login (Optional) */}
        <button
          type="button"
          className="w-full bg-white text-gray-700 py-3 rounded-full font-semibold 
                     hover:bg-gray-100 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-center mt-6 text-gray-200">
          Don’t have an account?{" "}
          {/* <a
            href="/signup"
            className="text-blue-300 hover:text-blue-400 font-medium underline"
          >
            Create One
          </a> */}
          <Link
  to="/signup"
  className="text-blue-300 hover:text-blue-400 font-medium underline"
>
  Create One
</Link>

        </p>
      </form>
    </div>
  );
}

export default SignIn;








