import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// ✅ Create Context
export const userdatacontext = createContext();

export const UserDataProvider = ({ children }) => {
  const serverURL = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const [backendImages, setBackendImages] = useState(null);
  const [frontendImages, setFrontendImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Fetch current user info (if logged in)
  const handleCurrentUser = async () => {
    try {
      const response = await axios.get(`${serverURL}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(response.data);
      console.log("✅ Current user data fetched:", response.data);
    } catch (error) {
      console.error(
        "❌ Failed to fetch current user data:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Get Gemini assistant response
  const getGeminiResponse = async (command) => {
    try {
      const response = await axios.post(
        `${serverURL}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Gemini assistant error:", error.response?.data || error.message);
      return null;
    }
  };

  // ✅ Run once on mount
  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <userdatacontext.Provider
      value={{
        serverURL,
        userData,
        setUserData,
        frontendImages,
        setFrontendImages,
        backendImages,
        setBackendImages,
        selectedImage,
        setSelectedImage,
        getGeminiResponse,
      }}
    >
      {children}
    </userdatacontext.Provider>
  );
};





