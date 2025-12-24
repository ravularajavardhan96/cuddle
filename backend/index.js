import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/users.routes.js";
import { connectToSocket } from "./src/controllers/socketManager.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// 🔑 THIS IS THE KEY LINE
connectToSocket(server);

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

app.get("/home", (req, res) => {
  res.send("This is home");
});

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  server.listen(process.env.PORT || 8000, () => {
    console.log("🚀 Server running with Socket.IO");
  });
};

start();
