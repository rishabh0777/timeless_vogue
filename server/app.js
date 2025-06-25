import dotenv from 'dotenv';
dotenv.config
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/db.js';
import User from './src/models/user.models.js';



// Connect to database
await connectDB();
const app = express();
app.use(cors());

app.use(cors({
  origin: 'https://glorious-space-sniffle-q5r6w755g4qf4gg7-5173.app.github.dev',
  credentials: true
}));

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));
app.use(cookieParser());



// Routes

  app.get('/', async (req, res)=>{
     const alluser = await User.find();
     res.json(alluser)
  })

// Product Route
import productRouter from './src/routes/product.routes.js';
app.use('/api/v1/products', productRouter);

// User Route
import userRouter from './src/routes/user.routes.js';
app.use('/api/v1/user', userRouter);

//Address Route
import addressRouter from './src/routes/address.routes.js';
app.use('/api/v1/address', addressRouter);

//Downloadable Invoices 
app.use("/invoices", express.static("invoices"));


export default app;