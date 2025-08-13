import express from 'express';
import { getUserProfile, updateUserProfile, getUserProfileById } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import multer from 'multer'
import { storage } from '../clouddinary.js';

const upload = multer({ storage });



const router = express.Router();

// GET - Get current user's profile (authenticated)
router.get('/profile', authenticate, getUserProfile);

// PUT - Update current user's profile (authenticated)
router.put('/profile', authenticate, 
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "bannerImage", maxCount: 1 }
      ])
    ,updateUserProfile);

// router.put('/profile/image',authenticate, upload.fields([
//     { name: "profileImage", maxCount: 1 },
//     { name: "bannerImage", maxCount: 1 }
//   ]),updateImage)


// GET - Get specific user's profile by ID (public view)
router.get('/profile/:userId', getUserProfileById);

export default router;
