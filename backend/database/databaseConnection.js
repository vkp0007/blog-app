import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

let isConnected = false;

export const dbConnection = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 5000, // fail fast if DB not reachable
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log("✅ Database connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
};
