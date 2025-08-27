import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./database/databaseConnection.js";
import cors from "cors"
import serverless from "serverless-http";

// import routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";


dotenv.config({ path: ".env" });

const app = express();

// middleware to parse json
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // React dev server (Vite)
  credentials: true
}));
// routes
app.use("/api/auth", authRoutes);       // register, login
app.use("/api/posts", postRoutes);      // CRUD posts
// add/delete comments

// db connection
dbConnection();


export default serverless(app);