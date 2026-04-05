import express from "express";
import { 
  getConversations, 
  getMessages, 
  sendMessage, 
  startConversation, 
  toggleResolved,
  getUnreadCount
} from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/conversations").get(protect, getConversations);
router.route("/unread-count").get(protect, getUnreadCount);
router.route("/start").post(protect, startConversation);
router.route("/:id").get(protect, getMessages).post(protect, sendMessage);
router.route("/conversations/:id/resolve").put(protect, toggleResolved);

export default router;
