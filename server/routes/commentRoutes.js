import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import { authenticate } from "../middleware/authMiddleware.js"; // if you have auth

const router = express.Router();

router.post("/:postId", authenticate, addComment);
router.get("/:postId", authenticate, getComments);

export default router;
