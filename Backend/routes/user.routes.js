import express from "express";
import {
  askToAssistant,
  getCurrentUser,
  updateAssistantDetails,
} from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

// ✅ Routes
userRouter.get("/current", isAuth, getCurrentUser);
userRouter.post(
  "/update-assistant",
  isAuth,
  upload.single("assistantImage"),
  updateAssistantDetails
);
userRouter.post('/asktoassistant', isAuth,askToAssistant);
export default userRouter;



