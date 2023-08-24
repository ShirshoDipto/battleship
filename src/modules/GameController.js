import Gameboard from "../models/Gameboard";
import Player from "../models/Player";

export default function GameController() {
  const players = [new Player("you")];

  const gameboards = [new Gameboard("you")];

  const initiateGameboard = (playerId) => {
    if (playerId === "you") {
      gameboards[0].initiateGameboard();
    } else {
      gameboards[1].initiateGameboard();
    }
  };

  const randomizeGameboardData = () => {
    gameboards[0].initiateGameboard();
    gameboards[0].randomizeBoard();

    return { board: gameboards[0], player: players[0] };
  };

  const resetBoardData = () => {
    gameboards[0].initiateGameboard();

    return gameboards[0];
  };

  const rotateShip = (ship) => {
    const newCoords = ship.getCoordsForRotation();
    const newAxis = ship.axis === "x" ? "y" : "x";

    if (gameboards[0].isValidLocation(ship.name, newAxis, newCoords)) {
      gameboards[0].repositionShip(ship.name, newAxis, newCoords);
      return true;
    }

    return false;
  };

  const placeShipOnBoard = (ship) => {
    const board = gameboards[0];
    if (ship.coords.length === 0) {
      board.placeShip(ship.name, ship.axis, board.hoveredCoords);
    } else {
      board.repositionShip(ship.name, ship.axis, board.hoveredCoords);
    }
  };

  const prepareGameVsAI = () => {
    players.push(new Player("ai"));
    players[0].togglePlayerTurn();
    gameboards.push(new Gameboard("ai"));
    initiateGameboard("ai");
    gameboards[1].randomizeBoard();
    gameboards[1].isPreping = false;
  };

  const startGameWithFnd = (player, board) => {
    players[0].roomId = player.roomId;
    players.push(new Player(player.id, player.isPlayerTurn, player.roomId));
    gameboards.push(new Gameboard(board.playerId));
    gameboards[1].initiateGameboard();
    gameboards[1].placeShipsFromCoords(board.allShips);
    gameboards[1].isPreping = false;
  };

  const handlePlayerAttack = (coord, board, player) => {
    if (!player.isPlayerTurn || board.isAttacked(coord)) {
      return false;
    }

    const didHitShip = board.receiveAttack(coord);

    if (board.isGameOver()) {
      player.isWinner = true;
      return "gameover";
    }

    if (didHitShip) {
      return "hit";
    }

    players[0].togglePlayerTurn();
    players[1].togglePlayerTurn();

    return "missed";
  };

  const isLeavingGame = () =>
    players[0].roomId && !players[0].isWinner && !players[1]?.isWinner;

  const changePlayerRoomId = (data) => {
    if (!players[0].roomId) {
      players[0].roomId = data;
    }
  };

  return {
    gameboards,
    players,
    initiateGameboard,
    randomizeGameboardData,
    resetBoardData,
    rotateShip,
    placeShipOnBoard,
    prepareGameVsAI,
    startGameWithFnd,
    isLeavingGame,
    handlePlayerAttack,
    changePlayerRoomId,
  };
}
