import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import {
  createPost,
  getAllPosts,
  toggleLikePost,
  getUserPosts,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", authenticate, createPost); // Create post
router.get("/", getAllPosts); // Get all posts
router.put("/:postId/like", authenticate, toggleLikePost); // Like/unlike post
router.get("/user/:userId", authenticate, getUserPosts); // Posts by user

export default router;
