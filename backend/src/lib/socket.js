import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import express from "express";
import Message from "../models/message.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// Map to track online users
const userSocketMap = {}; // { userId: socketId }

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;

    // Send updated online user list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // ✅ Send unread message counts grouped by sender
    try {
      const unreadCounts = await Message.aggregate([
        {
          $match: {
            receiverId: new mongoose.Types.ObjectId(userId),
            read: false,
          },
        },
        {
          $group: {
            _id: "$senderId",
            count: { $sum: 1 },
          },
        },
      ]);

      const formatted = {};
      unreadCounts.forEach((item) => {
        formatted[item._id] = item.count;
      });

      socket.emit("unreadMessageCounts", formatted);
    } catch (error) {
      console.error("Error sending unread counts:", error.message);
    }
  }

  // Realtime message relay
  socket.on("send-message", ({ senderId, receiverId, message }) => {
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive-message", {
        senderId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
