import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create post
router.post("/", protect, createPost);

// Get all posts
router.get("/", getAllPosts);

// Get single post
router.get("/:id", getPostById);

// ✅ Update post
router.put("/:id", protect, updatePost);

// ✅ Delete post
router.delete("/:id", protect, deletePost);

export default router;
