const lobbies = new Map(); // Store active lobbies

const createLobby = (lobbyId) => {
  lobbies.set(lobbyId, { players: [], quizStarted: false });
};

const addPlayerToLobby = (lobbyId, player) => {
  if (!lobbies.has(lobbyId)) {
    createLobby(lobbyId);
  }
  const lobby = lobbies.get(lobbyId);
  if (lobby.players.length < 2) {
    lobby.players.push(player);
  }
  if (lobby.players.length === 2) {
    lobby.quizStarted = true;
    return true; // Quiz can start
  }
  return false; // Wait for another player
};

const getLobby = (lobbyId) => lobbies.get(lobbyId);

module.exports = { addPlayerToLobby, getLobby };
