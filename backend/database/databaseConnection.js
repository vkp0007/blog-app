import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

let isConnected = false; // connection state

export const dbConnection = async () => {
  if (isConnected) {
    // Reuse existing connection
    console.log("🔄 Using existing MongoDB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // fail quickly if DB not reachable
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`✅ Database connected at ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    throw error;
  }
};
