import * as prep from "./displayControllers/prepInterface";
import Gameboard from "./models/Gameboard";
import Player from "./models/Player";
import Ship from "./models/Ship";

let main = document.querySelector(".main");
let gameboardGrid = document.querySelector(".main-grid");
// const newGameboard = new Gameboard();
// newGameboard.initiateGameboard();

const players = [new Player()];
const gameboards = [];
const allShips = {
  carrier: new Ship("carrier", 4, "x"),
  battleship1: new Ship("battleship1", 3, "x"),
  battleship2: new Ship("battleship2", 3, "x"),
  submarine1: new Ship("submarine1", 2, "x"),
  submarine2: new Ship("submarine2", 2, "x"),
  submarine3: new Ship("submarine3", 2, "x"),
  destroyer1: new Ship("destroyer1", 1, "x"),
  destroyer2: new Ship("destroyer2", 1, "x"),
  destroyer3: new Ship("destroyer3", 1, "x"),
  destroyer4: new Ship("destroyer4", 1, "x"),
};

function handleGameOption(e) {
  if (this.textContent === "vs Friend") {
    // here goes the multiplayer handling code
  } else {
    players[0].id = "host";
    players.push(new Player("ai"));
    gameboards.push(new Gameboard("host"), new Gameboard("ai"));
    gameboards[0].initiateGameboard();
    gameboards[1].initiateGameboard();
    prep.renderPreparations(main, gameboards[0], players[0].id, true);
  }
}

const gameOptions = document.querySelectorAll(".game-option");
gameOptions.forEach((option) => {
  option.addEventListener("click", handleGameOption);
});

// function resetShips() {
//   const newShips = allShips.map((ship) => {
//     ship.axis = "x";
//     ship.coords = [];
//     return ship;
//   });

//   allShips = newShips;
// }

const setEventListeners = () => {
  shipsContainer = document.querySelector(".ships-container");
  draggables = document.querySelectorAll(".draggable");
  cells = document.querySelectorAll(".cell");
  gameboardGrid = document.querySelector(".main-grid");

  draggables.forEach((d) => {
    d.addEventListener("dragstart", getMeasurements);
    d.addEventListener("drag", displayDraggablePositions);
    d.addEventListener("dragend", placeShipOnBoard);
    d.addEventListener("click", rotateShip);
  });

  cells.forEach((cell) => {
    cell.addEventListener("dragover", (e) => e.preventDefault());
  });
};

// const getShip = (elem) => {
//   return allShips.find((ship) => ship.name === elem.getAttribute("name"));
// };

const getElemAtPosition = (e, coord) => {
  const clientXDistance = e.clientX - coord[0];
  const clientYDistance = e.clientY - coord[1];
  return document.elementFromPoint(clientXDistance, clientYDistance);
};

const getCoords = (cellsArray) => {
  const coords = [];
  cellsArray.forEach((cell) => {
    if (cell.classList.contains("cell")) {
      const row = cell.getAttribute("row");
      const col = cell.getAttribute("col");
      coords.push([parseInt(row), parseInt(col)]);
    }
  });

  return coords;
};

const getOriginalShipStatus = (elem, ship) => {
  elem.classList.remove("dragging", "hide");
  ship.distanceFromMidToMouse = [];
  ship.isDraggable = false;
};

const getMeasurements = (e) => {
  e.target.classList.add("dragging");
  const shipCells = e.target.querySelectorAll(".ship-cell");
  const theShip = allShips[e.target.getAttribute("name")];
  shipCells.forEach((cell) => {
    const box = cell.getBoundingClientRect();
    const midCoord = [box.width / 2 + box.x, box.height / 2 + box.y];

    theShip.distanceFromMidToMouse.push([
      e.clientX - midCoord[0],
      e.clientY - midCoord[1],
    ]);
  });
};

const isSamePosition = (e, ship) => {
  const oldX = ship.initialX;
  const oldY = ship.initialY;
  const newX = e.clientX;
  const newY = e.clientY;
  ship.initialX = newX;
  ship.initialY = newY;
  return oldX === newX && oldY === newY;
};

const displayDraggablePositions = (e) => {
  let hoveredCells = [];
  const theShip = allShips[e.target.getAttribute("name")];

  if (isSamePosition(e, theShip)) return;
  const cells = document.querySelectorAll(".cell");
  e.target.classList.add("hide");

  theShip.distanceFromMidToMouse.forEach((d) => {
    const elemAtPosition = getElemAtPosition(e, d);
    if (elemAtPosition && elemAtPosition.classList.contains("cell")) {
      hoveredCells.push(elemAtPosition);
    }
  });

  const coords = getCoords(hoveredCells);

  if (
    coords.length === theShip.shipLength &&
    gameboards[0].isValidLocation(theShip.name, theShip.axis, coords)
  ) {
    theShip.isDraggable = true;
    cells.forEach((cell) => {
      if (!hoveredCells.includes(cell)) {
        cell.classList.remove("hovered");
      } else {
        cell.classList.add("hovered");
      }
    });
  } else {
    theShip.isDraggable = false;
    cells.forEach((cell) => {
      cell.classList.remove("hovered");
    });
  }
};

const placeShipOnBoard = (e) => {
  const theShip = allShips[e.target.getAttribute("name")];
  const cells = document.querySelectorAll(".cell");
  if (!theShip.isDraggable) {
    getOriginalShipStatus(e.target, theShip);
    return;
  }

  const hoveredCells = Array.from(cells).filter((cell) =>
    cell.classList.contains("hovered")
  );

  const coords = getCoords(hoveredCells);
  if (theShip.coords.length === 0) {
    gameboards[0].placeShip(theShip, theShip.axis, coords);
  } else {
    gameboards[0].repositionShip(theShip, theShip.axis, coords);
  }

  const elemAtPosition = getElemAtPosition(
    e,
    theShip.distanceFromMidToMouse[0]
  );

  console.log(gameboards[0].grid);
  console.log(gameboards[0].allShips);
  console.log(allShips);

  if (elemAtPosition.classList.contains("cell")) {
    elemAtPosition.appendChild(e.target);
    e.target.classList.add("dragged");
  }

  cells.forEach((cell) => {
    cell.classList.remove("hovered");
  });

  getOriginalShipStatus(e.target, theShip);
};

function rotateShip() {
  const shipToRotate = allShips[this.getAttribute("name")];
  if (shipToRotate.coords.length === 0) return;

  const newCoords = shipToRotate.getCoordsForRotation();
  const newAxis = shipToRotate.axis === "x" ? "y" : "x";
  const gameboardGrid = document.querySelector(".main-grid");

  if (gameboards[0].isValidLocation(shipToRotate.name, newAxis, newCoords)) {
    gameboards[0].repositionShip(shipToRotate, newAxis, newCoords);
    prep.renderGameboard(gameboardGrid, gameboards[0], players[0].id, true);
    console.log(gameboards[0].grid);
  } else {
    this.classList.add("invalid");
    setTimeout(() => {
      this.classList.remove("invalid");
    }, 500);
  }
}

const randomizeBoard = () => {
  const gameboardGrid = document.querySelector(".main-grid");
  const shipsContainer = document.querySelector(".ships-container");
  gameboards[0].initiateGameboard();
  gameboards[0].randomizeBoard(allShips);
  console.log(gameboards[0].grid);
  prep.renderGameboard(gameboardGrid, gameboards[0], players[0].id, true);
  prep.renderShipsContainer(shipsContainer, false);
};

const resetBoard = () => {
  const gameboardGrid = document.querySelector(".main-grid");
  const shipsContainer = document.querySelector(".ships-container");
  gameboards[0].initiateGameboard();
  prep.renderGameboard(gameboardGrid, gameboards[0], players[0].id, true);
  prep.renderShipsContainer(shipsContainer, true);
};

// const buttons = document.querySelectorAll(".bottom-section-button");
// buttons.forEach((button) => {
//   button.addEventListener("click", (e) => {
//     resetShips();
//     prep.resetGameboard(gameboardGrid, newGameboard);
//     prep.renderShipsContainer(shipsContainer, allShips);
//     setEventListeners();
//   });
// });

// const randomButton = document.getElementById("random-button");
// randomButton.addEventListener("click", (e) => {
//   newGameboard.initiateGameboard();
//   newGameboard.randomizeBoard();
//   prep.renderGameboard(gameboardGrid, newGameboard);
// });

// prep.renderGameboard(gameboardGrid, newGameboard);
// prep.renderShipsContainer(shipsContainer, allShips);
// setEventListeners();

// Once the selection is made (let's say the option was the AI)
//  create player
//  store players
//  let the player prepare the board
//  store the boards

export {
  getMeasurements,
  placeShipOnBoard,
  rotateShip,
  displayDraggablePositions,
  handleGameOption,
  randomizeBoard,
  resetBoard,
};
