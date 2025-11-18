import express from 'express';
import { signUP, Login, Logout } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

// Define user-related routes here
authRouter.post('/signup', signUP);
authRouter.post('/login', Login);
authRouter.post('/logout', Logout);

export default authRouter;
