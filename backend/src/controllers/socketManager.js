import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

export const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-call", (room) => {
      if (!connections[room]) connections[room] = [];
      connections[room].push(socket.id);
      timeOnline[socket.id] = new Date();

      connections[room].forEach(id => {
        io.to(id).emit("user-joined", socket.id, connections[room]);
      });

      if (messages[room]) {
        messages[room].forEach(msg => {
          io.to(socket.id).emit(
            "chat-message",
            msg.data,
            msg.sender,
            msg.socketIdSender
          );
        });
      }
    });

    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("chat-message", (data, sender) => {
      let roomFound = null;

      for (let room in connections) {
        if (connections[room].includes(socket.id)) {
          roomFound = room;
          break;
        }
      }

      if (!roomFound) return;

      if (!messages[roomFound]) messages[roomFound] = [];

      messages[roomFound].push({
        sender,
        data,
        socketIdSender: socket.id
      });

      connections[roomFound].forEach(id => {
        io.to(id).emit("chat-message", data, sender, socket.id);
      });
    });

    socket.on("disconnect", () => {
      for (let room in connections) {
        if (connections[room].includes(socket.id)) {
          connections[room] = connections[room].filter(id => id !== socket.id);
          connections[room].forEach(id => {
            io.to(id).emit("user-left", socket.id);
          });

          if (connections[room].length === 0) {
            delete connections[room];
          }
          break;
        }
      }

      delete timeOnline[socket.id];
    });
  });

  return io;
};
