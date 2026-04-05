import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
      address: {
        type: String,
        required: [true, "Please add a location address"],
      },
    },
    price: {
      type: Number,
      default: 0,
    },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    type: {
      type: String,
      enum: ["Offering", "Requesting"],
      default: "Requesting",
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

// Create geospatial index
postSchema.index({ "location.coordinates": "2dsphere" });

const Post = mongoose.model("Post", postSchema);

export default Post;
