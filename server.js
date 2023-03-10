const express = require("express");
const allRoutes = require("./controllers");
const sequelize = require("./config/connection");
const models = require("./models");
const http = require("http");
const cors = require("cors");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;
//=======================================================
// Creates HTTP server
const server = http.createServer(app);

// Sets up socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up routes
app.use("/", allRoutes);
// Sets up socket.io event handlers
const rooms = {};
const botName = "CATtention Bot";

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.once("join room", (roomCode, { userObject }) => {
    console.log(userObject);
    socket.join(roomCode);

    io.to(roomCode).emit("chat message", {
      message: `${botName}: ${userObject.username} has joined the room. Welcome to CATtention!`,
    });
    if (!rooms[roomCode]) {
      rooms[roomCode] = { users: [] };
    }
    rooms[roomCode].users.push(userObject);

    io.to(roomCode).emit("users in room", rooms[roomCode].users);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");

    Object.keys(rooms).forEach((roomCode) => {
      if (rooms[roomCode]) {
        const userIndex = rooms[roomCode].users.findIndex(
          (user) => user.socketId === socket.id
        );
        console.log(userIndex);
        if (userIndex !== -1) {
          const disconnectedUser = rooms[roomCode].users.splice(
            userIndex,
            1
          )[0];

          io.to(roomCode).emit("chat message", {
            message: `${botName}: ${disconnectedUser.username} has left the room.`,
          });

          io.to(roomCode).emit("users in room", rooms[roomCode].users);
        }
      }
    });
  });

  socket.on("timer", ({ roomCode, time, workStateBoolean }) => {
    socket.join(roomCode);

    const minutesWorked = time;

    const interval = setInterval(() => {
      timer(time);
      io.to(roomCode).emit("timer", { text, minutesWorked, workStateBoolean });
    }, 1000);

    console.log(`Room code is: ${roomCode}`);

    time *= 60;

    let text;
    const timer = () => {
      let minutes = Math.floor(time / 60);
      let secondsRemaining = time % 60;
      switch (secondsRemaining) {
        case 1: {
          secondsRemaining = "01";
          break;
        }
        case 2: {
          secondsRemaining = "02";
          break;
        }
        case 3: {
          secondsRemaining = "03";
          break;
        }
        case 4: {
          secondsRemaining = "04";
          break;
        }
        case 5: {
          secondsRemaining = "05";
          break;
        }
        case 6: {
          secondsRemaining = "06";
          break;
        }
        case 7: {
          secondsRemaining = "07";
          break;
        }
        case 8: {
          secondsRemaining = "08";
          break;
        }
        case 9: {
          secondsRemaining = "09";
          break;
        }
        case 0: {
          secondsRemaining = "00";
          break;
        }
        default: {
          break;
        }
      }

      time -= 1;

      if (time < 0) {
        text = "Time's up!";
        clearInterval(interval);
        console.log("interval Cleared");
      } else {
        text = `${minutes}:${secondsRemaining}`;
      }
    };
  });

  socket.on("chat message", (data) => {
    console.log(
      "Received message:",
      data.message,
      "from room:",
      data.roomCode,
      "at",
      new Date().toLocaleTimeString(),
      "from user:",
      data.userObject
    );

    // Emit the message to all clients in the same room
    io.to(data.roomCode).emit("chat message", {
      message: data.message,
      timestamp: new Date().toLocaleTimeString(),
      roomCode: data.roomCode,
      userObject: data.userObject, // Send the username back to the client
    });
  });
});

//=======================================================

// Starts database sync and Express server
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });
});
