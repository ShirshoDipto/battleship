import * as gameloop from "../index";

const renderCross = (container) => {
  container.innerHTML = `
                        <div class="cross-container">
                          <i class="uil uil-multiply"></i>
                        </div>
                        `;
};

const toggleEventListeners = (cells, player) => {
  const cellsArray = Array.from(cells);
  const playersCells = cellsArray.filter((c) => {
    return c.getAttribute("playerId") === player.id;
  });

  playersCells.forEach((pc) => {
    pc.addEventListener("click", gameloop.handlePlayerMove);
  });
};

const renderShip = (container, ship, isPreparing) => {
  const shipCells = [];
  const shipAxis = ship.axis === "x" ? "draggable-x" : "draggable-y";
  const dragged = ship.coords.length !== 0 ? "dragged" : "";
  const cursortype = isPreparing ? "" : "no-cursor";
  const sunkStyle = ship.isSunk() ? "sunk" : "";
  const offset = 3 / ship.shipLength;
  let shipStyle = `style="grid-template-columns: repeat(${ship.shipLength}, calc(var(--cell-width) - ${offset}px));"`;
  if (ship.axis === "y") {
    shipStyle = `style="grid-template-rows: repeat(${ship.shipLength}, calc(var(--cell-width) - ${offset}px));"`;
  }

  for (let i = 0; i < ship.shipLength; i += 1) {
    const cell = `<div class="ship-cell"></div>`;
    shipCells.push(cell);
  }

  container.innerHTML += `
                    <div class="draggable ${dragged} ${shipAxis} ${cursortype} ${sunkStyle}" 
                    ${shipStyle} name="${ship.name}" draggable="${isPreparing}">
                      ${shipCells.join("")}
                    </div>
                        `;
};

const getMarkStatus = (cellDiv, cellData) => {
  if (cellData.ship && cellData.markStatus) {
    renderCross(cellDiv);
  }

  if (cellData.markStatus === "hit" && !cellData.ship) {
    cellDiv.classList.add("hit");
  } else if (cellData.markStatus === "last") {
    cellDiv.classList.add("last");
  }
};

const renderCells = (container, board, player, isPreparing) => {
  const grid = board.grid;
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      container.innerHTML += `<div class="cell" playerId="${player.id}" row="${row}" col="${col}"></div>`;
      const elem = container.querySelector(`[row="${row}"][col="${col}"].cell`);
      const cellData = grid[row][col];
      getMarkStatus(elem, cellData);
      if (cellData.ship?.isStartCoord && player.id === board.playerId) {
        renderShip(elem, cellData.ship.shipObj, isPreparing);
      } else if (
        cellData.ship?.isStartCoord &&
        cellData.ship.shipObj.isSunk()
      ) {
        renderShip(elem, cellData.ship.shipObj, isPreparing);
      } else if (
        player.id !== board.playerId &&
        !cellData.markStatus &&
        player.isPlayerTurn
      ) {
        elem.classList.add("hover-effect");
      }
    }
  }
};

const renderGameboard = (container, board, player, isPreping) => {
  let cells = container.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", gameloop.handlePlayerMove);
  });

  container.innerHTML = `
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

                          <div class="main-grid"></div>`;

  const mainGrid = container.querySelector(".main-grid");
  renderCells(mainGrid, board, player, isPreping);

  cells = container.querySelectorAll(".cell");
  if (!isPreping && player.id === "you" && player.isPlayerTurn) {
    toggleEventListeners(cells, player);
  } else {
    cells.forEach((cell) => {
      cell.addEventListener("dragover", (e) => e.preventDefault());
    });

    const ships = container.querySelectorAll(".draggable");
    ships.forEach((ship) => {
      ship.addEventListener("click", gameloop.rotateShip);
      ship.addEventListener("dragstart", gameloop.getMeasurements);
      ship.addEventListener("drag", gameloop.displayDraggablePositions);
      ship.addEventListener("dragend", gameloop.placeShipOnBoard);
    });
  }
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

const renderPreparations = (container, gameboard, player, isPreparing) => {
  container.innerHTML = `
                          <div class="main-wrapper">
                            <div class="main-top">Prepare your board</div>
                            <div class="main-middle">
                              <div class="preparation-wrapper">
                                <div class="ships-container">
                                </div>
                                <div class="board-container">
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
                                  <button class="prep-button" id="start-from-prep">Start</button>
                                </div>              
                              </div>
                            </div>
                          </div>  
                          `;

  const boardContainer = container.querySelector(".board-container");
  const shipsContainer = container.querySelector(".ships-container");
  const baordRandomize = container.querySelector("#board-randomize");
  const boardReset = container.querySelector("#board-reset");
  const backButton = container.querySelector("#back-from-prep");
  const startButton = container.querySelector("#start-from-prep");

  renderShipsContainer(shipsContainer, true);
  renderGameboard(boardContainer, gameboard, player, isPreparing);
  baordRandomize.addEventListener("click", gameloop.randomizeBoard);
  boardReset.addEventListener("click", gameloop.resetBoard);
  backButton.addEventListener("click", gameloop.handleBackHome);
  startButton.addEventListener("click", gameloop.handleGameStart);
};

function renderHome(container) {
  container.innerHTML = `
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
