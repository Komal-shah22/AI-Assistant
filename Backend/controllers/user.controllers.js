import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import moment from "moment";
import geminiResponse from "../gemini.js";

// 🟢 Get Current Logged-in User
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

// 🟢 Update Assistant Details
export const updateAssistantDetails = async (req, res) => {
  try {
    const { assistantName, assistantImageURL } = req.body;
    let assistantImage;

    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = assistantImageURL;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantName, assistantImage },
      { new: true }
    ).select("-password");

    return res.status(200).json({ user });
  } catch (error) {
    console.error("❌ Error in updateAssistantDetails:", error.message);
    return res
      .status(500)
      .json({
        message: "Failed to update assistant details",
        error: error.message,
      });
  }
};

// 🟢 Ask Assistant
export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body; // ✅ Make sure this is first

    if (!command) {
      return res.status(400).json({ message: "Command is missing" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Push command to history
    if (!user.history) user.history = [];
    user.history.push(command);
    await user.save();

    const userName = user.name;
    const assistantName = user.assistantName || "Assistant";
    const assistantImage = user.assistantImage || null;

    // Get Gemini AI response
    const result = await geminiResponse(command, assistantName, userName);

    if (!result) {
      return res.status(200).json({
        response: "Sorry, I couldn’t understand that.",
        assistantImage,
        assistantName,
      });
    }

    // Extract JSON safely
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(200).json({
        response: "Sorry, I couldn’t understand that.",
        assistantImage,
        assistantName,
      });
    }

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(jsonMatch[0]);
    } catch {
      return res.status(200).json({
        response: "Sorry, something went wrong understanding your request.",
        assistantImage,
        assistantName,
      });
    }

    const type = jsonResponse.type || "general";
    const userInput = jsonResponse.userinput || command;
    const responseText = jsonResponse.response || "I have no answer for that.";

    // Handle date/time/month/day intents
    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput,
          response: `Current date is ${moment().format("MMMM Do YYYY")}`,
          assistantImage,
          assistantName,
        });

      case "get_day":
        return res.json({
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`,
          assistantImage,
          assistantName,
        });

      case "get_month":
        return res.json({
          type,
          userInput,
          response: `Current month is ${moment().format("MMMM")}`,
          assistantImage,
          assistantName,
        });

      case "get_time":
        return res.json({
          type,
          userInput,
          response: `Current time is ${moment().format("h:mm a")}`,
          assistantImage,
          assistantName,
        });

      default:
        return res.json({
          type,
          userInput,
          response: responseText,
          assistantImage,
          assistantName,
        });
    }
  } catch (error) {
    console.error("❌ Assistant Error:", error);
    return res.status(500).json({
      message: "Failed to get assistant response",
      error: error.message,
    });
  }
};

