import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";  // Ensure mongoose is imported
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // The origin you want to allow
  credentials: true,               // Allow credentials
};
app.use(cors(
   {
     origin:[""],
     methods:["POST",GET],
     credentials: true
    }
));

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
dbConnection();

// Example endpoint to test CORS
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

// Apply routes
app.use("/api/reservation", reservationRouter);

// Apply error middleware
app.use(errorMiddleware);

export default app;

