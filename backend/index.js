import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import serverless from "serverless-http";

import { dbConnection } from "./database/databaseConnection.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// ✅ Always connect to DB before handling requests
app.use(async (req, res, next) => {
  try {
    await dbConnection();
    next();
  } catch (err) {
    console.error("❌ DB Connection failed:", err.message);
    res.status(500).json({ message: "Database connection error" });
  }
});

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running and DB is connected!");
});

// Export serverless handler for Vercel
export const handler = serverless(app);
export default app;

