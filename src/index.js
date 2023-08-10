import {
  renderGameboard,
  resetGameboard,
  resetShipsContainer,
  ship1,
} from "./DOMinteraction/gameboard";

const gameboard = document.querySelector(".main-grid");

renderGameboard(gameboard);

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

const displayDraggablePositions = (e) => {
  let hoveredCells = [];
  const [newX, newY] = [e.clientX, e.clientY];
  if (initialX === newX && initialY === newY) {
    return;
  }

  [initialX, initialY] = [newX, newY];
  e.target.classList.add("hide");
  distanceFromMidToMouse.forEach((d) => {
    const clientXDistance = e.clientX - d[0];
    const clientYDistance = e.clientY - d[1];
    const elementAtPosition = document.elementFromPoint(
      clientXDistance,
      clientYDistance
    );

    if (elementAtPosition && elementAtPosition.classList.contains("cell")) {
      hoveredCells.push(elementAtPosition);
    }
  });

  const shipLenth = Array.from(e.target.querySelectorAll("*")).length;

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
  const clientXDistance = e.clientX - distanceFromMidToMouse[0][0];
  const clientYDistance = e.clientY - distanceFromMidToMouse[0][1];
  const elementAtPosition = document.elementFromPoint(
    clientXDistance,
    clientYDistance
  );

  if (elementAtPosition.classList.contains("cell")) {
    elementAtPosition.appendChild(e.target);
    e.target.classList.add("dragged");
  }

  distanceFromMidToMouse = [];
  cells.forEach((cell) => {
    cell.classList.remove("red");
  });

  e.target.classList.remove("dragging");
  e.target.classList.remove("hide");
};

const setEventListeners = () => {
  draggables.forEach((d) => {
    d.addEventListener("dragstart", getMeasurements);
  });

  draggables.forEach((d) => {
    d.addEventListener("drag", displayDraggablePositions);
  });

  draggables.forEach((d) => {
    d.addEventListener("dragend", placeShipOnBoard);
  });
};

setEventListeners();

const buttons = document.querySelectorAll(".bottom-section-button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    resetGameboard(gameboard);
    resetShipsContainer(shipsContainer);
    shipsContainer = document.querySelector(".ships-container");
    draggables = document.querySelectorAll(".draggable");
    cells = document.querySelectorAll(".cell");
    setEventListeners();
  });
});
