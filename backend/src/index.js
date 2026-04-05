import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"],
  },
});

// Socket.io Logic
io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`🏠 User joined room: ${roomId}`);
  });

  socket.on("send_message", (data) => {
    // data: { conversationId, senderId, content }
    io.to(data.conversationId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("👋 User disconnected");
  });
});

// Export io to use in controllers
app.set("io", io);

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
