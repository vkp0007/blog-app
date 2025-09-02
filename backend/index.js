import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import { dbConnection } from "./database/databaseConnection.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173" ],
    credentials: true,
  })
);
// ✅ Wrap handler: ensure DB is connected per request
const handler = async (req, res) => {
  await dbConnection();
  return app(req, res);
};

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


// test route
app.get("/", (req, res) => {
  res.send(" API is running and DB is connected!");
});
export default app
