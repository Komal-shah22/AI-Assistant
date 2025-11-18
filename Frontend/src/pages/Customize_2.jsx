import React, { useState, useContext } from 'react';
import { userdatacontext } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LuArrowLeft } from "react-icons/lu"; // 🔙 Back arrow icon

function Customize_2() {
  const { userData, backendImages, selectedImage, setUserData, serverURL } = useContext(userdatacontext);
  const [assistantName, setAssistantName] = useState(userData?.assistantName || '');
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    try {
      let formData = new FormData();
      formData.append('assistantName', assistantName);

      // append image file or pre-selected image URL
      if (backendImages) {
        formData.append('assistantImage', backendImages);
      } else {
        formData.append('assistantImageURL', selectedImage);
      }

      // ✅ use POST (matches backend route)
      const result = await axios.post(
        `${serverURL}/api/user/update-assistant`,
        formData,
        { withCredentials: true }
      );

      console.log('✅ Assistant updated successfully:', result.data);

      // Update context with new user data
      setUserData(result.data);

      // Navigate to dashboard
      navigate('/home');
    } catch (error) {
      console.error('❌ Error updating assistant:', error);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center gap-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">

      {/* 🔙 Back Arrow Button */}
      <button
        onClick={() => navigate('/customize')}
        className="absolute top-6 left-6 text-white hover:text-blue-400 transition-colors duration-200"
      >
        <LuArrowLeft size={30} />
      </button>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-lg">
        Enter your <span className="text-blue-400 glow-text">Assistant Name</span>
      </h1>

      {/* Input Field */}
      <input
        type="text"
        placeholder="e.g. Shifra"
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        className="w-full max-w-[450px] p-3 rounded-full bg-[#030326] border border-blue-500 text-white 
                   placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 text-center text-lg"
      />

      {/* Submit Button */}
      {assistantName && (
        <button
          onClick={handleUpdateAssistant}
          className="w-full max-w-[300px] bg-white text-blue-700 py-3 rounded-full font-semibold 
                     hover:bg-blue-700 hover:text-white active:scale-95 cursor-pointer transition-all duration-200 mt-8"
        >
          Finally Create Your Assistant
        </button>
      )}
    </div>
  );
}

export default Customize_2;



