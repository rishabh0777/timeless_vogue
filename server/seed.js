import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Product from './models/product.models.js';
import fs from 'fs';
import connectDB from './db/db.js';





// Seed function
export const seedData = async () => {
  try {
    //conect to database
    await connectDB();
    // Clear existing data
    await Product.deleteMany();
    console.log('🗑 Existing products deleted');

    // Insert new data
    const rawData = fs.readFileSync('./data/data.json', 'utf-8');
    const data = JSON.parse(rawData);
    await Product.insertMany(data);
    console.log('✅ Data successfully seeded');

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Failed to seed data:', error);
    mongoose.connection.close();
  }
};

seedData();
