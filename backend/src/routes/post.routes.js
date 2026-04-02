import express from "express";
import { createPost, getMyPosts, getAllPosts, updatePost, deletePost } from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createPost)
  .get(getAllPosts);

router.get("/my-posts", protect, getMyPosts);

router.route("/:id")
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
