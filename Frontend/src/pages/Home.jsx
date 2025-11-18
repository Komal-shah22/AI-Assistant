
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userdatacontext } from "../context/userContext";
import axios from "axios";
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user.gif";

const Home = () => {
  const { userData, setUserData, serverURL, getGeminiResponse } =
    useContext(userdatacontext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const hasGreetedRef = useRef(false); 
  const synth = window.speechSynthesis;
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [assistantDetails, setAssistantDetails] = useState({
    name: "Your Assistant",
    image: "/authBg.png",
  });

  // Fetch user and greet once
  useEffect(() => {
    const fetchUser = async () => {
      if (hasGreetedRef.current) return; 
      try {
        let user;
        if (!userData) {
          const res = await axios.get(`${serverURL}/api/user/current`, {
            withCredentials: true,
          });
          user = res.data.user;
          setUserData(user);
        } else {
          user = userData;
        }

        setAssistantDetails({
          name: user?.assistantName || "Your Assistant",
          image: user?.assistantImage || "/authBg.png",
        });

        // Greeting with follow-up prompt
        const greetingText = `Hello ${user.name}, welcome back! What can I help you with?`;
        setAiText(greetingText);
        hasGreetedRef.current = true;

        const utterance = new SpeechSynthesisUtterance(greetingText);
        isSpeakingRef.current = true;

        const voices = window.speechSynthesis.getVoices();
        const lang = /[\u0900-\u097F]/.test(utterance.text) ? "hi-IN" : "en-US";
        const voice = voices.find((v) => v.lang === lang);
        if (voice) utterance.voice = voice;
        utterance.lang = lang;

        utterance.onend = () => {
          isSpeakingRef.current = false;
          setAiText("");
          if (recognitionRef.current && !isRecognizingRef.current) {
            setTimeout(() => {
              try { recognitionRef.current.start(); } catch {}
            }, 500);
          }
        };

        synth.speak(utterance);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("userData");
    navigate("/signin");
  };

  const handleCustomize = () => navigate("/customize");

  // Text-to-speech
  const speak = (text) => {
    if (!text) return;

    setUserText(""); // hide user GIF when AI starts
    setAiText(text); // show AI GIF

    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;

    const voices = window.speechSynthesis.getVoices();
    const lang = /[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-US";
    const voice = voices.find((v) => v.lang === lang);
    if (voice) utterance.voice = voice;
    utterance.lang = lang;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setAiText(""); // hide AI GIF
      if (recognitionRef.current && !isRecognizingRef.current) {
        setTimeout(() => {
          try { recognitionRef.current.start(); } catch {}
        }, 500);
      }
    };

    synth.speak(utterance);
  };

  // Open URL safely
  const safeOpen = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle commands from Gemini response
  const handleCommand = (data) => {
    if (!data || typeof data !== "object") return;
    const { type, userInput, response } = data;

    speak(response);

    switch (type) {
      case "google_search":
        safeOpen(
          userInput
            ? `https://www.google.com/search?q=${encodeURIComponent(userInput)}`
            : "https://www.google.com"
        );
        break;
      case "instagram_open":
        safeOpen("https://www.instagram.com/");
        break;
      case "facebook_open":
        safeOpen("https://www.facebook.com/");
        break;
      case "calculator_open":
        safeOpen("https://www.google.com/search?q=calculator");
        break;
      case "weather_show":
        safeOpen(
          userInput
            ? `https://www.google.com/search?q=weather+${encodeURIComponent(userInput)}`
            : "https://www.google.com/search?q=weather"
        );
        break;
      case "youtube_search":
      case "youtube_play":
        safeOpen(
          userInput
            ? `https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`
            : "https://www.youtube.com"
        );
        break;
      default:
        break;
    }
  };

  // Voice Recognition Setup
  useEffect(() => {
    if (!userData) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    const startRecognition = () => {
      if (isRecognizingRef.current || isSpeakingRef.current) return;
      try {
        recognition.start();
        isRecognizingRef.current = true;
        setListening(true);
        console.log("🎙️ Recognition started");
      } catch (err) {
        console.warn("Recognition start failed:", err);
      }
    };

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        ?.trim()
        .toLowerCase();
      console.log("🎤 Heard:", transcript);
      if (!transcript) return;

      setUserText(transcript); // show user GIF

      if (transcript.includes(userData.assistantName?.toLowerCase())) {
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript);
        console.log("🤖 Gemini response:", data);
        handleCommand(data);
      }
    };

    recognition.onerror = (event) => {
      console.warn("⚠️ Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);

      if (event.error !== "aborted") {
        setTimeout(() => startRecognition(), 500);
      }
    };

    recognition.onend = () => {
      console.log("🛑 Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);
      setTimeout(() => startRecognition(), 500);
    };

    startRecognition(); // start once on mount

    return () => {
      try {
        recognition.stop();
      } catch {}
      isRecognizingRef.current = false;
    };
  }, [!!userData]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center justify-center gap-8 pt-16 pb-16 px-6">
      <div className="flex flex-col items-center gap-6">
        <img
          src={assistantDetails.image}
          alt="Assistant"
          className="w-60 h-80 rounded-lg object-cover border-4 border-white shadow-lg"
        />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center">
          I’m <span className="text-blue-400">{assistantDetails.name}</span>
        </h1>
      </div>

      {/* GIF Section */}
      <div className="mt-6 flex flex-col items-center gap-2">
        {userText && (
          <>
            <img
              src={userImg}
              alt="User speaking"
              className="w-[200px] mx-auto animate-pulse"
            />
            <p className="text-white text-center text-lg">{userText}</p>
          </>
        )}
        {aiText && (
          <>
            <img
              src={aiImg}
              alt="AI responding"
              className="w-[200px] mx-auto animate-pulse"
            />
            <p className="text-white text-center text-lg">{aiText}</p>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <button
          onClick={handleCustomize}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 shadow-md"
        >
          Customize Your Assistant
        </button>

        <button
          onClick={handleLogout}
          className="bg-white text-blue-700 px-8 py-3 rounded-full hover:bg-blue-700 hover:text-white shadow-md"
        >
          Logout
        </button>
      </div>

      {listening && (
        <p className="absolute bottom-6 text-sm text-blue-300 animate-pulse">
          🎧 Listening...
        </p>
      )}
    </div>
  );
};

export default Home;




