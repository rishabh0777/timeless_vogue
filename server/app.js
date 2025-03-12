import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/db.js';

// Connect to database
await connectDB();
const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
// Product Route
import productRouter from './src/routes/product.routes.js';
app.use('/api/v1/products', productRouter);

export default app;