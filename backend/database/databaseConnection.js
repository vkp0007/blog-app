import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

let isConnected = false;

export const dbConnection = async () => {
  if (isConnected) {
    console.log("⚡ Already connected to the database.");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in .env file");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || "test", // fallback if DB_NAME missing
      serverSelectionTimeoutMS: 5000, // fail fast if DB not reachable
    });

    isConnected = mongoose.connection.readyState === 1;

    console.log(
      `✅ Database connected: ${conn.connection.name} at ${conn.connection.host}`
    );
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    throw error;
  }
};
