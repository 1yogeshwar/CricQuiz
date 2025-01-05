
// // server.js
// const express = require('express');
// const connectDb = require('./util/db');
// const app = express();
// const port = 3001;
// const cors = require('cors');
// const authrouter = require('./router/auth-router');
// const quizroutes = require('./router/quiz-router');
// const contactRoute = require("./router/contact-router");

// app.use(cors());

// app.use(express.json());
// app.use('/api/', authrouter);
// app.use('/api/quizzes', quizroutes);
// app.use("/api/contact", contactRoute);



// connectDb().then(() => {
//   app.listen(port, () => {
//     console.log(`App is listening on port ${port}`);
//   });
// });

const express = require("express");
const connectDb = require("./util/db");
const cors = require("cors");
const http = require("http"); // Import HTTP to create a server
const { Server } = require("socket.io"); // Import Socket.IO
const authrouter = require("./router/auth-router");
const quizroutes = require("./router/quiz-router");
const contactRoute = require("./router/contact-router");

// Initialize Express app
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/", authrouter);
app.use("/api/quizzes", quizroutes);
app.use("/api/contact", contactRoute);

// Create HTTP server and initialize Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for now; adjust for production
    methods: ["GET", "POST"],
  },
});

// Database connection
connectDb().then(() => {
  server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});

// WebSocket Logic
// WebSocket Logic
const lobbies = {}; // Store active lobbies with player scores and answers

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  let assignedLobby = null;

  // Assign user to a lobby
  for (const lobby in lobbies) {
    if (lobbies[lobby].players.length < 2) {
      assignedLobby = lobby;
      break;
    }
  }

  // If no lobby is available, create a new one
  if (!assignedLobby) {
    assignedLobby = `lobby_${Date.now()}`;
    lobbies[assignedLobby] = { players: [], scores: {}, completed: {} };
  }

  // Add user to the lobby
  lobbies[assignedLobby].players.push(socket.id);
  lobbies[assignedLobby].scores[socket.id] = 0; // Initialize score
  lobbies[assignedLobby].completed[socket.id] = false; // Track completion status
  socket.join(assignedLobby);

  console.log(`User ${socket.id} joined ${assignedLobby}`);

  // Check if the lobby is full (2 players)
  if (lobbies[assignedLobby].players.length === 2) {
    console.log(`Lobby ${assignedLobby} is full. Starting quiz.`);
    io.to(assignedLobby).emit("startQuiz", { lobby: assignedLobby });
  }

  // Handle answer submission
  socket.on("answer", (data) => {
    const { lobby, player, correct, time } = data;
    console.log(`Answer received from ${player} in ${lobby}:`, data);

    // Update the player's score if the answer is correct
    if (correct) {
      lobbies[lobby].scores[player] += 1;
    }

    // Broadcast updated score to all players in the lobby
    io.to(lobby).emit("updateScore", {
      player,
      correct,
      time,
      score: lobbies[lobby].scores[player],
    });
  });

  // Handle quiz completion
  socket.on("finishQuiz", ({ lobby, player }) => {
    if (!lobbies[lobby]) return;

    console.log(`Player ${player} finished the quiz in ${lobby}`);
    lobbies[lobby].completed[player] = true;

    // Check if all players have finished
    const allPlayersFinished = Object.values(lobbies[lobby].completed).every(
      (status) => status === true
    );

    if (allPlayersFinished) {
      const { scores, players } = lobbies[lobby];

      // Determine the winner
      let winner = null;
      let maxScore = -1;

      players.forEach((player) => {
        if (scores[player] > maxScore) {
          maxScore = scores[player];
          winner = player;
        }
      });

      // Broadcast the result before cleanup
      players.forEach((player) => {
        const result =
          player === winner ? "You are the winner!" : "You lose this time.";
        io.to(player).emit("quizResult", { result });
      });

      console.log(`Quiz in lobby ${lobby} ended. Winner: ${winner}`);

      // Wait briefly before cleaning up (to ensure clients receive results)
      setTimeout(() => {
        delete lobbies[lobby];
        console.log(`Lobby ${lobby} has been cleaned up.`);
      }, 5000); // 5-second delay for cleanup
    } else {
      io.to(lobby).emit("waitingForOtherPlayer", {
        message: "Waiting for the other player to finish...",
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove user from their lobby
    for (const lobby in lobbies) {
      const index = lobbies[lobby].players.indexOf(socket.id);
      if (index !== -1) {
        lobbies[lobby].players.splice(index, 1);
        delete lobbies[lobby].scores[socket.id];
        delete lobbies[lobby].completed[socket.id];

        if (lobbies[lobby].players.length === 0) {
          delete lobbies[lobby]; // Remove empty lobby
        }
        break;
      }
    }
  });
});
