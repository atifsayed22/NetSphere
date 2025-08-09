// routes/connectionRoutes.js
import express from "express";
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getPendingRequests,
  getConnections,
  deleteRequest,
  existingConnection 
} from "../controllers/connectionController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authenticate, sendConnectionRequest);
router.put("/accept/:connectionId", authenticate, acceptConnectionRequest);
router.put("/reject/:connectionId", authenticate, rejectConnectionRequest);
router.get("/pending", authenticate, getPendingRequests);
router.get('/isConnection/:recipientId',authenticate,existingConnection)
router.get("/", authenticate, getConnections);
router.delete('/cancel/:recipientId',authenticate,deleteRequest)
// GET all pending requests for logged-in user

  

export default router;
