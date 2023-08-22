import * as prep from "./displayControllers/prepInterface";
import * as gp from "./displayControllers/gameplay";
import Gameboard from "./models/Gameboard";
import Player from "./models/Player";
import { socket } from "./socket";

const main = document.querySelector(".main");
let players = [new Player("you")];
let gameboards = [new Gameboard("you")];
socket.connect();

function startGameWithFnd({ player, board }) {
  players[0].roomId = player.roomId;
  players.push(new Player(player.id, player.isPlayerTurn, player.roomId));
  gameboards.push(new Gameboard(board.playerId));
  gameboards[1].initiateGameboard();
  gameboards[1].placeShipsFromCoords(board.allShips);
  gameboards[1].isPreping = false;
  gp.renderGameplayScreen(main, players, gameboards);
}

window.addEventListener("beforeunload", () => {
  socket.emit("leaveRoom", players[0].roomId);
  socket.disconnect();
});

function prepareGameVsAI() {
  players.push(new Player("ai"));
  players[0].togglePlayerTurn();
  gameboards.push(new Gameboard("ai"));
  gameboards[1].initiateGameboard();
  gameboards[1].randomizeBoard();
  gameboards[1].isPreping = false;
}

function handleGameOption() {
  if (!gameboards.every((gb) => gb.areAllShipsPlaced())) {
    alert("Please place all your ships on board.");
    return;
  }

  gameboards[0].isPreping = false;
  if (this.id === "ai-game-button") {
    prepareGameVsAI();
    gp.renderGameplayScreen(main, players, gameboards);
  } else if (this.id === "create-game-button") {
    socket.emit("createGame", { player: players[0], board: gameboards[0] });
  } else if (this.id === "join-game-button") {
    gp.renderRoomJoinDisplay(main);
  }
}

function handleGameJoin(e) {
  e.preventDefault();
  const inputElem = document.getElementById("code-to-join");
  const { value } = inputElem;
  players[0].togglePlayerTurn();
  socket.emit("joinGame", {
    code: parseInt(value),
    player: players[0],
    board: gameboards[0],
  });
}

function getElemAtPosition(e, coord) {
  const clientXDistance = e.clientX - coord[0];
  const clientYDistance = e.clientY - coord[1];
  return document.elementFromPoint(clientXDistance, clientYDistance);
}

function getCoords(cellsArray) {
  const coords = [];

  cellsArray.forEach((cell) => {
    if (cell.classList.contains("cell")) {
      const row = cell.getAttribute("row");
      const col = cell.getAttribute("col");
      coords.push([parseInt(row), parseInt(col)]);
    }
  });

  return coords;
}

function getCellsToVerify(e, theShip) {
  const detectedCells = [];
  theShip.distFromMidToMouse.forEach((d) => {
    const elemAtPosition = getElemAtPosition(e, d);
    if (
      elemAtPosition &&
      elemAtPosition.classList.contains("cell") &&
      !detectedCells.includes(elemAtPosition)
    ) {
      detectedCells.push(elemAtPosition);
    }
  });

  return detectedCells;
}

function storeMeasurements(e) {
  e.target.classList.add("dragging");
  const shipCells = e.target.querySelectorAll(".ship-cell");
  const theShip = gameboards[0].allShips[e.target.getAttribute("name")];

  shipCells.forEach((cell) => {
    const box = cell.getBoundingClientRect();
    const midCoord = [box.width / 2 + box.x, box.height / 2 + box.y];
    theShip.storeDists(e.clientX, e.clientY, midCoord);
  });
}

function displayDraggablePositions(e) {
  e.target.classList.add("hide");
  const theBoard = gameboards[0];
  const theShip = theBoard.allShips[e.target.getAttribute("name")];
  if (theShip.isSameDraggingPos(e)) return;

  const hoveredCells = getCellsToVerify(e, theShip);
  const coords = getCoords(hoveredCells);

  if (
    coords.length === theShip.shipLength &&
    theBoard.isValidLocation(theShip.name, theShip.axis, coords)
  ) {
    theShip.isDraggable = true;
    prep.toggleHover(main, theBoard.hoveredCoords, false);
    theBoard.hoveredCoords = coords;
    prep.toggleHover(main, theBoard.hoveredCoords, true);
  } else {
    theShip.isDraggable = false;
    prep.toggleHover(main, theBoard.hoveredCoords, false);
  }
}

function getOriginalShipStatus(elem, theShip) {
  elem.classList.remove("dragging", "hide");
  theShip.distFromMidToMouse = [];
  theShip.isDraggable = false;
}

function placeShipOnBoard(e) {
  const theBoard = gameboards[0];
  const theShip = theBoard.allShips[e.target.getAttribute("name")];

  if (!theShip.isDraggable) {
    getOriginalShipStatus(e.target, theShip);
    return;
  }

  if (theShip.coords.length === 0) {
    theBoard.placeShip(theShip.name, theShip.axis, theBoard.hoveredCoords);
  } else {
    theBoard.repositionShip(theShip.name, theShip.axis, theBoard.hoveredCoords);
  }

  const elemAtPosition = getElemAtPosition(e, theShip.distFromMidToMouse[0]);
  if (elemAtPosition.classList.contains("cell")) {
    elemAtPosition.appendChild(e.target);
    e.target.classList.add("dragged");
  }

  prep.toggleHover(main, theBoard.hoveredCoords, false);
  getOriginalShipStatus(e.target, theShip);
}

function rotateShip() {
  const shipToRotate = gameboards[0].allShips[this.getAttribute("name")];
  if (shipToRotate.coords.length === 0 || shipToRotate.shipLength === 1) return;

  const newCoords = shipToRotate.getCoordsForRotation();
  const newAxis = shipToRotate.axis === "x" ? "y" : "x";
  const boardContainer = document.querySelector(".board-container");

  if (gameboards[0].isValidLocation(shipToRotate.name, newAxis, newCoords)) {
    gameboards[0].repositionShip(shipToRotate.name, newAxis, newCoords);
    prep.renderGameboard(boardContainer, gameboards[0], players[0], true);
  } else {
    this.classList.add("invalid");
    setTimeout(() => {
      this.classList.remove("invalid");
    }, 500);
  }
}

function randomizeBoard() {
  const boardContainer = document.querySelector(".board-container");
  const shipsContainer = document.querySelector(".ships-container");
  gameboards[0].initiateGameboard();
  gameboards[0].randomizeBoard();
  prep.renderGameboard(boardContainer, gameboards[0], players[0]);
  prep.renderShipsContainer(shipsContainer, false, gameboards[0].allShips);
}

function resetBoard() {
  const boardContainer = document.querySelector(".board-container");
  const shipsContainer = document.querySelector(".ships-container");
  gameboards[0].initiateGameboard();
  prep.renderGameboard(boardContainer, gameboards[0], players[0], true);
  prep.renderShipsContainer(shipsContainer, true, gameboards[0].allShips);
}

function handleGameOver(player) {
  gp.renderGameplayScreen(main, players, gameboards);
  player.isWinner = true;
  gp.handleGameOverRendering(main, players, gameboards);
}

function handleBackHome() {
  if (players[0].roomId && !players[0].isWinner && !players[1]?.isWinner) {
    socket.emit("leaveRoom", { roomId: players[0].roomId, isGameOver: false });
  }
  players = [new Player("you")];
  gameboards = [new Gameboard("you")];
  gameboards[0].initiateGameboard();
  prep.renderPreparations(main, gameboards[0], players[0], true);
}

function handleAIAttackHelper() {
  const val = new Promise((resolve) => {
    setTimeout(() => {
      const isHit = players[1].genAIAttack(gameboards[0]);
      gp.renderGameplayScreen(main, players, gameboards);
      resolve(isHit);
    }, 500);
  });

  return val;
}

async function handleAIAttack() {
  let didHitShip = await handleAIAttackHelper();
  while (didHitShip) {
    didHitShip = await handleAIAttackHelper();
  }

  players[0].togglePlayerTurn();
  gp.renderGameplayScreen(main, players, gameboards);
}

async function handlePlayerMove() {
  try {
    const coord = [
      parseInt(this.getAttribute("row")),
      parseInt(this.getAttribute("col")),
    ];

    const didHitShip = players[0].attack(gameboards[1], coord);
    if (players[0].roomId && players[1].roomId) {
      socket.emit("attack", { code: players[0].roomId, coord });
    }

    if (gameboards[1].isGameOver()) {
      handleGameOver(players[0]);
      return;
    }

    if (didHitShip) {
      gp.renderGameplayScreen(main, players, gameboards);
      return;
    }

    players[1].togglePlayerTurn();
    gp.renderGameplayScreen(main, players, gameboards);
    if (players[1].id === "ai") {
      await handleAIAttack();
      if (gameboards[0].isGameOver()) {
        handleGameOver(players[1]);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
}

gameboards[0].initiateGameboard();
prep.renderPreparations(main, gameboards[0], players[0], true);

socket.on("connect_error", (error) => {
  // eslint-disable-next-line no-console
  console.log(error);
});

socket.on("error", (error) => {
  alert(error);
});

socket.on("created", (data) => {
  if (!players[0].roomId) {
    players[0].roomId = data;
  }
  gp.renderRoomIdDisplay(main, data);
});

socket.on("receiveAttack", (coord) => {
  const didHitShip = players[1].attack(gameboards[0], coord);
  if (gameboards[0].isGameOver()) {
    players[1].isWinner = true;
    gp.renderGameplayScreen(main, players, gameboards);
    return gp.handleGameOverRendering(main, players, gameboards);
  }
  if (didHitShip) {
    return gp.renderGameplayScreen(main, players, gameboards);
  }

  players[0].togglePlayerTurn();
  return gp.renderGameplayScreen(main, players, gameboards);
});

socket.on("joined", startGameWithFnd);
socket.on("receiveHostData", startGameWithFnd);

export {
  storeMeasurements,
  placeShipOnBoard,
  rotateShip,
  displayDraggablePositions,
  handleGameOption,
  randomizeBoard,
  resetBoard,
  handleBackHome,
  handlePlayerMove,
  handleGameJoin,
};
