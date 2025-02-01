import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config(); //always config here too.

const MONGODB_URI = process.env.MONGODB_URI;
export const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} `);
        
    } catch (err) {
        console.log("MongoDB Connection Error: ", err.message);
    }
};