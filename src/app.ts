import express from 'express';
import cookiesRouter from './routes/cookiesRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// Routes
app.use('/api/cookies', cookiesRouter);

// Global error handler
app.use(errorHandler);
export default app;
