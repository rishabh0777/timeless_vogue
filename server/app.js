import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Product from './models/product.models.js';
import connectDB from './db/db.js';

// Connect to database
await connectDB();
const app = express();
app.use(cors());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api/products', async (req, res) => {
  try {
    
      const products = await Product.find();
      res.json(products);
    
  } catch (error) {
    console.log('error :', error)
  }
});



export default app;
