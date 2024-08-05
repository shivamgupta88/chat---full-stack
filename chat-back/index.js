// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:5173", // React app URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on("send_message", (message) => {
//     // Emit the message to all connected clients
//     io.emit("receive_message", message);
//   });

//   socket.on("set_name", (name) => {
//     // Emit the message to all connected clients
//     socket.emit("get_name", name);
//   });

//   socket.on("join_room", (room) => {
//     // Emit the message to all connected clients
//     socket.join(room);
//     socket.to(room).emit("userJoined", room)
//     console.log("user joined room", room)
//     // socket.to(room).emit("userJoined", `User has joined room: ${room}`);
//   });

//   //   socket.on("room_var" , ({ room , roomVar}) => {
//   //     io.to(room).emit("get_var" , roomVar)
//   //   }
//   // )
//   socket.on("room_var", ({ room, roomVar }) => {
//     // Make sure to check if the room exists and users are connected
//     if (io.sockets.adapter.rooms[room]) {
//         io.to(room).emit("get_var", roomVar);
//     } else {
//         console.log(`Room ${room} does not exist or has no users.`);
//     }
// });

//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });

// server.listen(4000, () => {
//   console.log("Server listening on port 4000");
// });
/// -------

// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:5173", // React app URL
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on("send_message", (message) => {
//     io.emit("receive_message", message);
//   });

//   socket.on("set_name", (name) => {
//     socket.emit("get_name", name);
//   });

//   socket.on("join_room", (room) => {
//     socket.join(room);
//     console.log(`User ${socket.id} joined room: ${room}`);

//     // Emit event to notify other users in the room
//     socket.to(room).emit("userJoined", room);

//     // Log the current state of rooms
//     console.log("Current rooms:", io.sockets.adapter.rooms);
//   });

//   socket.on("room_var", ({ room, roomVar }) => {
//     const roomExists = io.sockets.adapter.rooms.has(room);
//     if (roomExists) {
//       io.to(room).emit("get_var", roomVar);
//       console.log(`Broadcasting ${roomVar} to room: ${room}`);
//     } else {
//       console.log(`Room ${room} does not exist or has no users.`);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`🔥: ${socket.id} user disconnected`);
//   });
// });

// server.listen(4000, () => {
//   console.log("Server listening on port 4000");
// });

// --------

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const { createClient } = require("redis");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis successfully!");
});

// Connect to Redis and handle connection errors
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("send_message", (message) => {
    io.emit("receive_message", message);
  });

  socket.on("set_name", (name) => {
    socket.emit("get_name", name);
  });

  socket.on("join_room", async (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);

    // Emit event to notify other users in the room
    socket.to(room).emit("userJoined", room);

    try {
      // Retrieve any stored roomVar for this room and send it to the user
      const roomVar = await redisClient.get(room);
      if (roomVar) {
        console.log(`Retrieved roomVar for room ${room}:`, roomVar);
        socket.emit("get_var", roomVar); // Send the stored value to the joining user
        await redisClient.del(room);
      }
    } catch (err) {
      console.error("Error retrieving roomVar from Redis:", err);
    }

    // Log the current state of rooms
    console.log("Current rooms:", io.sockets.adapter.rooms);
  });

  socket.on("room_var", async ({ room, roomVar }) => {
    const roomExists = io.sockets.adapter.rooms.has(room);

    if (roomExists && io.sockets.adapter.rooms.get(room).size > 0) {
      // If room exists and has users, broadcast the variable
      io.to(room).emit("get_var", roomVar);
      console.log(`Broadcasting ${roomVar} to room: ${room}`);
    } else {
      // Store roomVar in Redis if no users are in the room
      try {
        await redisClient.set(room, roomVar);
        console.log(`Stored roomVar for room ${room}:`, roomVar);
      } catch (err) {
        console.error("Error storing roomVar in Redis:", err);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} user disconnected`);
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
