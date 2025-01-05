# CriQuiz - Real-Time Cricket Quiz Platform

![image](https://github.com/user-attachments/assets/8f86d705-e4eb-4afe-b09b-09142d617085)


## Overview

CriQuiz is an interactive multiplayer cricket quiz application that lets users test their cricket knowledge in real-time competitions. Built with the MERN stack, it features live multiplayer gameplay, secure authentication, and an engaging user interface.

## Features

- **Real-Time Multiplayer**: Compete with multiple players simultaneously using Socket.io
- **Multiple Quiz Categories**:
  - International Cricket
  - World Test Championship (WTC)
  - World Cup
  - Women's International Cricket
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Dynamic Lobby System**: Synchronized waiting rooms for multiplayer matches
- **Live Leaderboard**: Real-time scoring and instant winner declarations

## Tech Stack

- **Frontend**: React.js (Vite), Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Authentication**: JWT, bcrypt


## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/criquiz.git
cd criquiz
```

2. Install dependencies for both client and server
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In server directory, create .env file
PORT=5000
MONGODB_URI=your_mongodb_uri



## Running the Application

1. Start the server
```bash
cd server
nodemon server.js
```

2. Start the client application
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Game Flow

1. User registers/logs in to the platform
2. Selects a quiz category
3. Enters the lobby and waits for other players
4. Participates in the quiz when all players join
5. Views results and winner declaration

## Screenshots

![image](https://github.com/user-attachments/assets/d60fac4b-ede3-424a-b483-5b7f93592117)
![image](https://github.com/user-attachments/assets/fd1207dd-031e-485f-aae4-c736331dcf93)
![image](https://github.com/user-attachments/assets/1ccf34c4-d29a-4c60-b3ee-23d8afb0653e)

