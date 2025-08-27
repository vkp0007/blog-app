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
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" // replace with frontend URL
    ],
    credentials: true,
  })
);

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// ✅ Wrap handler: ensure DB is connected per request
const handler = async (req, res) => {
  await dbConnection();
  return app(req, res);
};

export default serverless(handler);
