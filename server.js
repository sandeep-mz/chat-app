const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const SocketServer = socketIo.Server;

const PORT = 5500;

const expressServer = express();
const httpServer = http.createServer(expressServer);

const io = new SocketServer(httpServer);

io.on("connection", (socket) => {
  socket.on("joinChat", (username) => {
    socket.username = username; // Set the username to the socket object
    io.emit("userJoined", username + " joined");
  });

  socket.on("this is a msg event", (data) => {
    io.emit("this is a msg event", data);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("userLeft", socket.username + " left");
    }
  });
});

expressServer.use(express.static("public"));

httpServer.listen(PORT, () => {
  console.log(`App is up and running on http://localhost:${PORT}/`);
});
