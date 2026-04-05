import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    skills: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    pricing: {
      type: Number,
      default: 0,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
      city: { type: String },
      area: { type: String },
    },
    availability: {
      type: String,
      enum: ["Full-time", "Part-time", "None"],
      default: "None",
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    settings: {
      privacy: {
        profilePublic: { type: Boolean, default: true },
        showEmail: { type: Boolean, default: false }
      },
      notifications: {
        messages: { type: Boolean, default: true },
        posts: { type: Boolean, default: true }
      }
    }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
