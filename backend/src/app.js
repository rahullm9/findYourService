import express from "express";
import cors from "cors";

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------- Routes ---------------
import authRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import messageRoutes from "./routes/message.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
