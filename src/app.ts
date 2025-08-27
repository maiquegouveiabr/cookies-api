import express from 'express';
import cookiesRouter from './routes/cookiesRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';

const allowedOrigins = [
  'https://referralcuritiba.vercel.app',
  'https://referralcuritibasouth.vercel.app',
  'http://localhost:3000',
];

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

// Routes
app.use('/api/cookies', cookiesRouter);

// Global error handler
app.use(errorHandler);
export default app;
