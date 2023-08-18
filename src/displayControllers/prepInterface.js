import Ship from "../models/Ship";
import * as gameloop from "../index";

// const ship1 = new Ship("carrier", 4, "y", [12, 22, 32, 42]);
// const ship2 = new Ship("battleship", 3, "x", [24, 25, 26]);
// gameboard[12].ship = {
//   isStartCoord: true,
//   shipObj: ship1,
// };
// gameboard[22].ship = {
//   isStartCoord: false,
//   shipObj: ship1,
// };
// gameboard[32].ship = {
//   isStartCoord: false,
//   shipObj: ship1,
// };
// gameboard[42].ship = {
//   isStartCoord: false,
//   shipObj: ship1,
// };
// gameboard[24].ship = {
//   isStartCoord: true,
//   shipObj: ship2,
// };
// gameboard[25].ship = {
//   isStartCoord: false,
//   shipObj: ship2,
// };
// gameboard[26].ship = {
//   isStartCoord: false,
//   shipObj: ship2,
// };

const renderCross = () => `
                          <div class="cross-container">
                            <div class="horizontal"></div>
                            <div class="vertical"></div>
                          </div>
                          `;

const renderShip = (ship, isPreparing) => {
  const shipCells = [];
  const shipAxis = ship.axis === "x" ? "draggable-x" : "draggable-y";
  const dragged = ship.coords.length !== 0 ? "dragged" : "";
  let shipStyle;
  if (ship.axis === "x") {
    shipStyle = `style="grid-template-columns: repeat(${ship.shipLength}, var(--cell-width));"`;
  } else {
    shipStyle = `style="grid-template-rows: repeat(${ship.shipLength}, var(--cell-width));"`;
  }

  for (let i = 0; i < ship.shipLength; i += 1) {
    const cell = `<div class="ship-cell"></div>`;
    shipCells.push(cell);
  }

  const shipContainer = `
                          <div class="draggable ${dragged} ${shipAxis}" 
                          ${shipStyle} name="${
    ship.name
  }" draggable="${isPreparing}">
                            ${shipCells.join("")}
                          </div>
                        `;

  return shipContainer;
};

// const renderCells = (container) => {

// };

const renderGameboard = (container, gameboard, playerId, isPreparing) => {
  container.innerHTML = "";

  const grid = gameboard.grid;

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      let shipElem = "";
      if (
        gameboard.playerId === playerId &&
        grid[row][col].ship?.isStartCoord
      ) {
        shipElem = renderShip(grid[row][col].ship.shipObj, isPreparing);
      }

      const cell = `<div class="cell" playerId="${playerId}" row="${row}" col="${col}">
                      ${shipElem}
                   </div>`;

      container.innerHTML += cell;
    }
  }

  if (isPreparing) {
    const draggables = container.querySelectorAll(".draggable");
    draggables.forEach((d) => {
      d.addEventListener("click", gameloop.rotateShip);
      d.addEventListener("dragstart", gameloop.getMeasurements);
      d.addEventListener("drag", gameloop.displayDraggablePositions);
      d.addEventListener("dragend", gameloop.placeShipOnBoard);
    });
  }

  const cells = container.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("dragover", (e) => e.preventDefault());
  });
};

const renderShipsContainer = (container, isShipShowing) => {
  container.innerHTML = `
                        <div class="ships-container">
                          <div class="ship-row">
                            <div class="len4-container ship-container" name="carrier">
                              <div class="draggable draggable-x ${
                                isShipShowing ? "" : "hide"
                              }" style="grid-template-columns: repeat(4, var(--cell-width));" name="carrier" draggable="true">
                                <div class="ship-cell"></div><div class="ship-cell"></div><div class="ship-cell"></div><div class="ship-cell"></div>
                              </div>
                            </div>
                          </div>

                          <div class="ship-row">
                            <div class="len3-container ship-container" name="battleship1">
                              <div class=" ${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x " style="grid-template-columns: repeat(3, var(--cell-width));" name="battleship1" draggable="true">
                                <div class="ship-cell"></div><div class="ship-cell"></div><div class="ship-cell"></div>
                              </div>
                            </div>

                            <div class="len3-container ship-container" name="battleship2">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(3, var(--cell-width));" name="battleship2" draggable="true">
                                <div class="ship-cell"></div><div class="ship-cell"></div><div class="ship-cell"></div>
                              </div>
                            </div>
                          </div>

                          <div class="ship-row">
                            <div class="len2-container ship-container" name="submarine1">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(2, var(--cell-width));" name="submarine1" draggable="true">
                                <div class="ship-cell"></div><div class="ship-cell"></div>
                              </div>
                            </div>

                            <div class="len2-container ship-container" name="submarine2">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(2, var(--cell-width));" name="submarine2" draggable="true">
                                <div class="ship-cell"></div><div class="ship-cell"></div>
                              </div>
                            </div>

                            <div class="len2-container ship-container" name="submarine3">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(2, var(--cell-width));" name="submarine3" draggable="true">
                                <div class="ship-cell"></div><div class="ship-cell"></div>
                              </div>
                            </div>
                          </div>

                          <div class="ship-row">
                            <div class="len1-container ship-container" name="destroyer1">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(1, var(--cell-width));" name="destroyer1" draggable="true">
                                <div class="ship-cell"></div>
                              </div>
                            </div>

                            <div class="len1-container ship-container" name="destroyer2">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(1, var(--cell-width));" name="destroyer2" draggable="true">
                                <div class="ship-cell"></div>
                              </div>
                            </div>

                            <div class="len1-container ship-container" name="destroyer3">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(1, var(--cell-width));" name="destroyer3" draggable="true">
                                <div class="ship-cell"></div>
                              </div>
                            </div>

                            <div class="len1-container ship-container" name="destroyer4">
                              <div class="${
                                isShipShowing ? "" : "hide"
                              } draggable draggable-x" style="grid-template-columns: repeat(1, var(--cell-width));" name="destroyer4" draggable="true">
                                <div class="ship-cell"></div>
                              </div>
                            </div>
                          </div>
                        </div>`;

  const draggables = container.querySelectorAll(".draggable");
  draggables.forEach((d) => {
    d.addEventListener("dragstart", gameloop.getMeasurements);
    d.addEventListener("drag", gameloop.displayDraggablePositions);
    d.addEventListener("dragend", gameloop.placeShipOnBoard);
    d.addEventListener("click", gameloop.rotateShip);
  });
};

const renderPreparations = (container, gameboard, playerId, isPreparing) => {
  container.innerHTML = "";
  container.innerHTML = `
                          <div class="main-wrapper">
                            <div class="main-top">Prepare your board</div>
                            <div class="main-middle">
                              <div class="preparation-wrapper">
                                <div class="ships-container">
                                </div>
                                <div class="board-container">
                                    <div class="coord-num"></div>
                                    <div class="coord-num">0</div>
                                    <div class="coord-num">1</div>
                                    <div class="coord-num">2</div>
                                    <div class="coord-num">3</div>
                                    <div class="coord-num">4</div>
                                    <div class="coord-num">5</div>
                                    <div class="coord-num">6</div>
                                    <div class="coord-num">7</div>
                                    <div class="coord-num">8</div>
                                    <div class="coord-num">9</div>
                                    <div class="coord-num">0</div>
                                    <div class="coord-num">1</div>
                                    <div class="coord-num">2</div>
                                    <div class="coord-num">3</div>
                                    <div class="coord-num">4</div>
                                    <div class="coord-num">5</div>
                                    <div class="coord-num">6</div>
                                    <div class="coord-num">7</div>
                                    <div class="coord-num">8</div>
                                    <div class="coord-num">9</div>
                                    <div class="main-grid">
                                      
                                    </div>
                                </div>
                              </div>
                            </div>
                            <div class="main-bottom">
                              <div class="board-options-wrapper">
                                <div class="board-options-container">
                                  <a href="javascript:;" id="board-randomize" class="board-option">Randomize</a>
                                  <a href="javascript:;" id="board-reset" class="board-option">Reset</a>
                                </div>
                                <div class="prep-buttons-container">
                                  <button class="prep-button" id="back-from-prep">Back</button>
                                  <button class="prep-button id="start-from-prep"">Start</button>
                                </div>              
                              </div>
                            </div>
                          </div>  
                          `;

  const mainGrid = container.querySelector(".main-grid");
  const shipsContainer = container.querySelector(".ships-container");
  const baordRandomize = container.querySelector("#board-randomize");
  const boardReset = container.querySelector("#board-reset");
  const backButton = container.querySelector("#back-from-prep");
  const startButton = container.querySelector("#start-from-prep");

  renderShipsContainer(shipsContainer, true);
  renderGameboard(mainGrid, gameboard, playerId, isPreparing);
  baordRandomize.addEventListener("click", gameloop.randomizeBoard);
  boardReset.addEventListener("click", gameloop.resetBoard);
  backButton.addEventListener("click", gameloop.handleBackHome);
};

function renderHome(container) {
  container.innerHTML = "";
  container.innerHTML += `
                        <div class="main-wrapper">
                          <div class="main-top"></div>
                            <div class="main-middle">
                                <div class="opitons-wrapper">
                                    <button class="game-option">vs Friend</button>
                                    <button class="game-option">vs AI</button>
                                </div>
                            </div>
                          <div class="main-bottom"></div>
                        </div>
                        `;
  const buttons = container.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", gameloop.handleGameOption);
  });
}

export {
  renderGameboard,
  renderShipsContainer,
  renderPreparations,
  renderHome,
};
