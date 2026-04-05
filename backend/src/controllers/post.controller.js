import Post from "../models/post.model.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
  const { title, category, description, location, price, urgency, type } = req.body;

  try {
    // location should be { coordinates: [lng, lat], address: "string" }
    const post = await Post.create({
      user: req.user._id,
      title,
      category,
      description,
      location: {
        type: "Point",
        coordinates: location.coordinates,
        address: location.address,
      },
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

// @desc    Get nearby posts
// @route   GET /api/posts/nearby
// @access  Public
export const getNearbyPosts = async (req, res) => {
  const { lat, lng, distance = 10, category, type, minPrice, maxPrice } = req.query;

  try {
    const query = { status: "Active" };

    if (category) query.category = category;
    if (type) query.type = type;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Safety check for coordinates
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ message: "Invalid coordinates provided. Please enable location." });
    }

    // Geospatial search: distance in meters
    const radiusInMeters = Number(distance) * 1000;

    const posts = await Post.find({
      ...query,
      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusInMeters,
        },
      },
    }).populate("user", "name profilePhoto bio");

    res.json(posts);
  } catch (error) {
    console.error("DEBUG [Nearby Error]:", error);
    res.status(500).json({ message: "Neighborhood search failed. Ensure database location indices are built." });
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
    // Defensive check: filter for posts that might have corrupted location data
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active posts (Nearby/Community feed fallback)
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (req, res) => {
  try {
    // Only return active posts that have valid location data
    const posts = await Post.find({ 
      status: "Active",
      "location.type": "Point" 
    })
    .populate("user", "name email profilePhoto")
    .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
