import {Post} from "../models/post.models.js";

// Create Post
 const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Post
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    const updatedPost = await post.save();

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 export {createPost,getAllPosts,getPostById,updatePost,deletePost}