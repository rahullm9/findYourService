import express from "express";
import { 
  createPost, 
  getMyPosts, 
  getAllPosts, 
  updatePost, 
  deletePost, 
  getNearbyPosts 
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Geospatial search (must be before /:id)
router.get("/nearby", getNearbyPosts);

// Standard listing paths
router.route("/")
  .post(protect, createPost)
  .get(getAllPosts);

router.get("/my-posts", protect, getMyPosts);

// Individual post management
router.route("/:id")
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
