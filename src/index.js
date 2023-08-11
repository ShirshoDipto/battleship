import {
  renderGameboard,
  resetGameboard,
  resetShipsContainer,
  ship1,
} from "./DOMinteraction/gameboard";

import Gameboard from "./models/Gameboard";

const gameboardGrid = document.querySelector(".main-grid");
const newGameboard = new Gameboard();
newGameboard.initiateGameboard();

renderGameboard(gameboardGrid, newGameboard.grid);

let shipsContainer = document.querySelector(".ships-container");
let draggables = document.querySelectorAll(".draggable");
let cells = document.querySelectorAll(".cell");

let distanceFromMidToMouse = [];
let initialX;
let initialY;

const getMeasurements = (e) => {
  e.target.classList.add("dragging");
  const shipCells = e.target.querySelectorAll(".ship-cell");
  shipCells.forEach((cell) => {
    const box = cell.getBoundingClientRect();
    const midCoord = [box.width / 2 + box.x, box.height / 2 + box.y];
    distanceFromMidToMouse.push([
      e.clientX - midCoord[0],
      e.clientY - midCoord[1],
    ]);
  });
};

const getElemAtPosition = (e, coord) => {
  const clientXDistance = e.clientX - coord[0];
  const clientYDistance = e.clientY - coord[1];
  return document.elementFromPoint(clientXDistance, clientYDistance);
};

const displayDraggablePositions = (e) => {
  let hoveredCells = [];
  // const [newX, newY] = [e.clientX, e.clientY];
  // if (initialX === newX && initialY === newY) return;

  // [initialX, initialY] = [newX, newY];
  // e.target.classList.add("hide");
  distanceFromMidToMouse.forEach((d) => {
    const elemAtPosition = getElemAtPosition(e, d);

    if (elemAtPosition && elemAtPosition.classList.contains("cell")) {
      hoveredCells.push(elemAtPosition);
    }
  });

  const shipLenth = e.target.querySelectorAll("*").length;

  if (hoveredCells.length === shipLenth) {
    cells.forEach((cell) => {
      if (!hoveredCells.includes(cell)) {
        cell.classList.remove("red");
      } else {
        cell.classList.add("red");
      }
    });
  } else {
    cells.forEach((cell) => {
      cell.classList.remove("red");
    });
  }
};

const placeShipOnBoard = (e) => {
  // const clientXDistance = e.clientX - distanceFromMidToMouse[0][0];
  // const clientYDistance = e.clientY - distanceFromMidToMouse[0][1];
  // const elemAtPosition = document.elementFromPoint(
  //   clientXDistance,
  //   clientYDistance
  // );
  const elemAtPosition = getElemAtPosition(e, distanceFromMidToMouse[0]);

  if (elemAtPosition.classList.contains("cell")) {
    elemAtPosition.appendChild(e.target);
    e.target.classList.add("dragged");
  }

  distanceFromMidToMouse = [];
  cells.forEach((cell) => {
    cell.classList.remove("red");
  });

  e.target.classList.remove("dragging", "hide");
};

const setEventListeners = () => {
  draggables.forEach((d) => {
    d.addEventListener("dragstart", getMeasurements);
    d.addEventListener("drag", displayDraggablePositions);
    d.addEventListener("dragend", placeShipOnBoard);
  });

  cells.forEach((cell) => {
    cell.addEventListener("dragover", (e) => e.preventDefault());
  });
};

setEventListeners();

const buttons = document.querySelectorAll(".bottom-section-button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    resetGameboard(gameboardGrid, newGameboard);
    resetShipsContainer(shipsContainer);
    shipsContainer = document.querySelector(".ships-container");
    draggables = document.querySelectorAll(".draggable");
    cells = document.querySelectorAll(".cell");
    setEventListeners();
  });
});
