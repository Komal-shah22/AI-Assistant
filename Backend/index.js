import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// ✅ Start Server
app.listen(port, () => {
  connectDB();
  console.log(`✅ Server started on port ${port}`);
});
