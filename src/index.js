import {
  renderGameboard,
  resetGameboard,
  renderShipsContainer,
} from "./DOMinteraction/gameboardDOM";

import Gameboard from "./models/Gameboard";
import Ship from "./models/Ship";

const gameboardGrid = document.querySelector(".main-grid");
const newGameboard = new Gameboard();
newGameboard.initiateGameboard();

let allShips = [];

// has to be like this because at the beginning, the ships are not stored in the gameboard
const ship1 = new Ship("carrier", 4, "x");
const ship2 = new Ship("battleship1", 3, "x");
const ship3 = new Ship("battleship2", 3, "x");
const ship4 = new Ship("submarine1", 2, "x");
const ship5 = new Ship("submarine2", 2, "x");
const ship6 = new Ship("submarine3", 2, "x");
const ship7 = new Ship("destroyer1", 1, "x");
const ship8 = new Ship("destroyer2", 1, "x");
const ship9 = new Ship("destroyer3", 1, "x");
const ship10 = new Ship("destroyer4", 1, "x");

let shipsContainer = document.querySelector(".ships-container");
let draggables;
let cells;

allShips.push(
  ship1,
  ship2,
  ship3,
  ship4,
  ship5,
  ship6,
  ship7,
  ship8,
  ship9,
  ship10
);

function resetShips() {
  const newShips = allShips.map((ship) => {
    ship.axis = "x";
    ship.coords = [];
    return ship;
  });

  allShips = newShips;
}

const setEventListeners = () => {
  shipsContainer = document.querySelector(".ships-container");
  draggables = document.querySelectorAll(".draggable");
  cells = document.querySelectorAll(".cell");

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

const getShip = (elem) => {
  return allShips.find((ship) => ship.name === elem.getAttribute("name"));
};

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
  const theShip = getShip(e.target);
  shipCells.forEach((cell) => {
    const box = cell.getBoundingClientRect();
    const midCoord = [box.width / 2 + box.x, box.height / 2 + box.y];

    theShip.distanceFromMidToMouse.push([
      e.clientX - midCoord[0],
      e.clientY - midCoord[1],
    ]);
  });
};

const displayDraggablePositions = (e) => {
  let hoveredCells = [];
  const theShip = getShip(e.target);
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
    newGameboard.isValidLocation(theShip.name, theShip.axis, coords)
  ) {
    cells.forEach((cell) => {
      if (!hoveredCells.includes(cell)) {
        cell.classList.remove("hovered");
      } else {
        cell.classList.add("hovered");
      }
    });
    theShip.isDraggable = true;
  } else {
    cells.forEach((cell) => {
      cell.classList.remove("hovered");
    });
    theShip.isDraggable = false;
  }
};

const placeShipOnBoard = (e) => {
  const theShip = getShip(e.target);
  if (!theShip.isDraggable) {
    getOriginalShipStatus(e.target, theShip);
    return;
  }

  const hoveredCells = Array.from(cells).filter((cell) =>
    cell.classList.contains("hovered")
  );

  const coords = getCoords(hoveredCells);
  theShip.coords.length === 0
    ? newGameboard.placeShip(theShip, theShip.axis, coords)
    : newGameboard.repositionShip(theShip, theShip.axis, coords);
  // renderGameboard(gameboardGrid, newGameboard.grid);
  // setEventListeners();

  const elemAtPosition = getElemAtPosition(
    e,
    theShip.distanceFromMidToMouse[0]
  );

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
  const shipName = this.getAttribute("name");
  const shipToRotate = allShips.find((ship) => ship.name === shipName);
  if (shipToRotate.coords.length === 0) return;

  const newCoords = shipToRotate.getCoordsForRotation();
  const newAxis = shipToRotate.axis === "x" ? "y" : "x";

  if (newGameboard.isValidLocation(shipName, newAxis, newCoords)) {
    newGameboard.repositionShip(shipToRotate, newAxis, newCoords);
    renderGameboard(gameboardGrid, newGameboard.grid);
    setEventListeners();
  }
}

const buttons = document.querySelectorAll(".bottom-section-button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    resetShips();
    resetGameboard(gameboardGrid, newGameboard);
    renderShipsContainer(shipsContainer, allShips);
    setEventListeners();
  });
});

renderGameboard(gameboardGrid, newGameboard.grid);
renderShipsContainer(shipsContainer, allShips);
setEventListeners();
