import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.js';
import reservationRouter from './routes/reservationRoute.js';
import { dbConnection } from './database/dbConnection.js';

dotenv.config({ path: './config/config.env' });

const app = express();

// CORS options
const corsOptions = {
  credentials: true,
  origin: true,
};

// Apply CORS middleware once
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
dbConnection();

// Example endpoint to test CORS
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'HELLO WORLD AGAIN',
  });
});

// Apply reservation routes
app.use('/api/reservation', reservationRouter);

// Apply error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

