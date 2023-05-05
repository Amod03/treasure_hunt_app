import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path:"../config.env"});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.ATLAS_URI);
    console.log("Database Connected");
    return conn;
  } catch (error) {
    console.log(`connection failed ${error}`);
    process.exit(1);
  }
};

export { connectDB };
