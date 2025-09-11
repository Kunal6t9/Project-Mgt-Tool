import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron"; 
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./features/auth/userRoutes.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

dotenv.config();

// Connect to the database
connectDB();

export const app = express();

// Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
// register your routes before error handler
app.use("/api/user", userRouter);

app.use(errorMiddleware);

// Scheduled tasks 
// Schedule the cleanup task to run daily at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running scheduled job: Removing unverified accounts...');
  removeUnverifiedAccounts();
}, {
  // Set to your server's timezone
  timezone: "Asia/Kolkata" 
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});