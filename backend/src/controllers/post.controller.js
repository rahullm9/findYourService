import Post from "../models/post.model.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  const { title, category, description, location, price, urgency, type } = req.body;

  try {
    const post = await Post.create({
      user: req.user._id,
      title,
      category,
      description,
      location,
      price: price || 0,
      urgency: urgency || "Low",
      type: type || "Requesting",
    });

    if (post) {
      res.status(201).json(post);
    } else {
      res.status(400).json({ message: "Invalid post data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check for user ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check for user ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's posts
// @route   GET /api/posts/my-posts
// @access  Private
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active posts (Nearby/Community feed)
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find({ status: "Active" }).populate("user", "name email").sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
