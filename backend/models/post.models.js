// models/Post.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Post = mongoose.model("Post", PostSchema);
