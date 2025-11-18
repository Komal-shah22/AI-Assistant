import React, { useState, useContext } from "react";
import bg from "../assets/authBg.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userdatacontext } from "../context/userContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverURL,userData, setUserData }=useContext(userdatacontext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // for validation or API error
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // ✅ Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setError(""); // clear previous error
    setLoading(true);

    try {
      const response = await axios.post(
        `${serverURL}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(response.data); // Update user context
      console.log("✅ User registered successfully:", response.data);
      setLoading(false);
      navigate("/customize");
    } catch (error) {
      setLoading(false);
      setUserData(null)
      setError(
        error.response?.data?.message || "Signup failed! Please try again."
      );
      console.error("❌ Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        onSubmit={handleSignUp}
        className="relative bg-[#00000067] backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl 
                   w-full max-w-md transition-transform duration-300 hover:scale-[1.02]"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">
          <span className="text-white">Register to </span>
          <span className="text-blue-400">Virtual Assistant</span>
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        {/* Full Name */}
        <div className="mb-5">
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 rounded-full text-white placeholder-gray-300 
                       border border-gray-300 bg-transparent focus:outline-none 
                       focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="email"
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
                       focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-8 relative">
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="password"
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
                       focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[36px] right-3 text-white coursor-pointer"
          >
            {showPassword ? (
              <IoIosEyeOff className="w-6 h-6" />
            ) : (
              <IoIosEye className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-3 rounded-full font-semibold 
                     hover:bg-blue-700 active:scale-95 transition-all duration-200
                     ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Already have an account */}
        <p className="text-sm text-center mt-5 text-gray-200">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-400 hover:text-blue-500 underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;





