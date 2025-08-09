import express from 'express';
import { getUserProfile, updateUserProfile, getUserProfileById } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET - Get current user's profile (authenticated)
router.get('/profile', authenticate, getUserProfile);

// PUT - Update current user's profile (authenticated)
router.put('/profile', authenticate, updateUserProfile);




// GET - Get specific user's profile by ID (public view)
router.get('/profile/:userId', getUserProfileById);

export default router;
