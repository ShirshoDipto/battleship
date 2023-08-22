import * as gameloop from "../index";

function toggleHover(container, coords, isShow) {
  if (coords.length === 0) return;
  coords.forEach((c) => {
    const cell = container.querySelector(`[row="${c[0]}"][col="${c[1]}"]`);
    if (isShow) {
      cell.classList.add("hovered");
    } else {
      cell.classList.remove("hovered");
    }
  });
}

function renderCross(container) {
  container.innerHTML = `
                        <div class="cross-container">
                          <i class="uil uil-multiply"></i>
                        </div>
                        `;
}

function giveEventListeners(cells, player) {
  const cellsArray = Array.from(cells);
  const playersCells = cellsArray.filter(
    (c) => c.getAttribute("playerId") !== player.id
  );

  playersCells.forEach((pc) => {
    pc.addEventListener("click", gameloop.handlePlayerMove);
  });
}

function renderShip(container, ship, isPreparing, showStatus) {
  const shipCells = [];
  const shipAxis = ship.axis === "x" ? "draggable-x" : "draggable-y";
  const dragged = ship.coords.length !== 0 ? "dragged" : "";
  const cursortype = isPreparing ? "" : "no-cursor";
  const sunkStyle = ship.isSunk() ? "sunk" : "";
  const offset = ship.getOffset();
  let shipStyle = `style="grid-template-columns: repeat(${ship.shipLength}, calc(var(--cell-width) - ${offset}px));"`;
  if (ship.axis === "y") {
    shipStyle = `style="grid-template-rows: repeat(${ship.shipLength}, calc(var(--cell-width) - ${offset}px));"`;
  }

  for (let i = 0; i < ship.shipLength; i += 1) {
    const cell = `<div class="ship-cell"></div>`;
    shipCells.push(cell);
  }

  container.innerHTML += `
                    <div class="draggable ${dragged} ${shipAxis} ${cursortype} ${sunkStyle} ${showStatus}" 
                    ${shipStyle} name="${ship.name}" draggable="${isPreparing}">
                      ${shipCells.join("")}
                    </div>
                        `;
}

function showMark(cellDiv, cellData) {
  if (cellData.ship && cellData.markStatus) {
    renderCross(cellDiv);
  }

  if (cellData.markStatus === "hit" && !cellData.ship) {
    cellDiv.classList.add("hit");
  } else if (cellData.markStatus === "last") {
    cellDiv.classList.add("last");
  }
}

function renderCells(container, board, player) {
  const { grid } = board;
  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      container.innerHTML += `<div class="cell" playerId="${board.playerId}" row="${row}" col="${col}"></div>`;
      const elem = container.querySelector(`[row="${row}"][col="${col}"].cell`);
      const cellData = grid[row][col];
      showMark(elem, cellData);

      if (cellData.ship?.isStartCoord && player.id === board.playerId) {
        renderShip(elem, cellData.ship.shipObj, board.isPreping, "");
      } else if (
        cellData.ship?.isStartCoord &&
        cellData.ship.shipObj.isSunk()
      ) {
        renderShip(elem, cellData.ship.shipObj, board.isPreping, "");
      } else if (
        player.id !== board.playerId &&
        !cellData.markStatus &&
        player.isPlayerTurn
      ) {
        elem.classList.add("hover-effect");
      }
    }
  }
}

function renderGameboard(container, board, player) {
  let cells = container.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", gameloop.handlePlayerMove);
  });

  container.innerHTML = `
                        <div class="coord-num"></div>
                        <div class="coord-num">1</div>
                        <div class="coord-num">2</div>
                        <div class="coord-num">3</div>
                        <div class="coord-num">4</div>
                        <div class="coord-num">5</div>
                        <div class="coord-num">6</div>
                        <div class="coord-num">7</div>
                        <div class="coord-num">8</div>
                        <div class="coord-num">9</div>
                        <div class="coord-num">10</div>
                        <div class="coord-num">A</div>
                        <div class="coord-num">B</div>
                        <div class="coord-num">C</div>
                        <div class="coord-num">D</div>
                        <div class="coord-num">E</div>
                        <div class="coord-num">F</div>
                        <div class="coord-num">G</div>
                        <div class="coord-num">H</div>
                        <div class="coord-num">I</div>
                        <div class="coord-num">J</div>

                        <div class="main-grid"></div>
                        `;

  const mainGrid = container.querySelector(".main-grid");
  renderCells(mainGrid, board, player);

  cells = container.querySelectorAll(".cell");
  if (!board.isPreping && player.id === "you" && player.isPlayerTurn) {
    giveEventListeners(cells, player);
  } else if (board.isPreping) {
    cells.forEach((cell) => {
      cell.addEventListener("dragover", (e) => e.preventDefault());
    });

    const ships = container.querySelectorAll(".draggable");
    ships.forEach((ship) => {
      ship.addEventListener("click", gameloop.rotateShip);
      ship.addEventListener("dragstart", gameloop.storeMeasurements);
      ship.addEventListener("drag", gameloop.displayDraggablePositions);
      ship.addEventListener("dragend", gameloop.placeShipOnBoard);
    });
  }
}

function renderShipsContainer(container, isShipShowing, ships) {
  container.innerHTML = `
                        <div class="ships-container">
                          <div class="ship-row">
                            <div class="len4-container ship-container" name="carrier"></div>
                          </div>

                          <div class="ship-row">
                            <div class="len3-container ship-container" name="battleship1"></div>
                            <div class="len3-container ship-container" name="battleship2"></div>
                          </div>

                          <div class="ship-row">
                            <div class="len2-container ship-container" name="submarine1"></div>
                            <div class="len2-container ship-container" name="submarine2"></div>
                            <div class="len2-container ship-container" name="submarine3"></div>
                          </div>

                          <div class="ship-row">
                            <div class="len1-container ship-container" name="destroyer1"></div>
                            <div class="len1-container ship-container" name="destroyer2"></div>
                            <div class="len1-container ship-container" name="destroyer3"></div>
                            <div class="len1-container ship-container" name="destroyer4"></div>
                          </div>
                          <div class="board-options-container">
                            <span id="board-randomize" class="board-option">Randomize</span>
                            <span id="board-reset" class="board-option">Reset</span>
                          </div>
                        </div>`;

  const shipContainers = container.querySelectorAll(".ship-container");
  shipContainers.forEach((c) => {
    const theShip = ships[c.getAttribute("name")];
    const showStatus = isShipShowing ? "" : "hide";
    renderShip(c, theShip, true, showStatus);
  });

  const draggables = container.querySelectorAll(".draggable");
  draggables.forEach((d) => {
    d.addEventListener("dragstart", gameloop.storeMeasurements);
    d.addEventListener("drag", gameloop.displayDraggablePositions);
    d.addEventListener("dragend", gameloop.placeShipOnBoard);
    d.addEventListener("click", gameloop.rotateShip);
  });

  const baordRandomize = container.querySelector("#board-randomize");
  const boardReset = container.querySelector("#board-reset");
  baordRandomize.addEventListener("click", gameloop.randomizeBoard);
  boardReset.addEventListener("click", gameloop.resetBoard);
}

function renderPreparations(container, gameboard, player) {
  container.innerHTML = `
                          <div class="main-wrapper">
                            <div class="main-top">
                              <p class="main-top-title">Prepare your board</p>
                              <p class="main-top-subtitle">(Drag to place ship, click to rotate after placing)</p>
                            </div>
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
                                <div class="prep-options-container">
                                  <div class="play-friend-container">
                                    <span class="play-container-header">vs Online Friend</span>
                                    <div class="play-button-container">
                                      <button class="play-button" id="create-game-button">Create Game</button>
                                      <button class="play-button" id="join-game-button">Join Game</button>
                                    </div>
                                  </div>
                                  <div class="play-ai-container">
                                    <span class="play-container-header">vs AI</span>
                                    <div class="play-button-container">
                                      <button class="play-button" id="ai-game-button">Start</button>
                                    </div>
                                  </div>
                                </div>              
                              </div>
                            </div>
                          </div>  
                          `;

  const boardContainer = container.querySelector(".board-container");
  const shipsContainer = container.querySelector(".ships-container");
  const playButtons = container.querySelectorAll(".play-button");

  renderShipsContainer(shipsContainer, true, gameboard.allShips);
  renderGameboard(boardContainer, gameboard, player);
  playButtons.forEach((button) => {
    button.addEventListener("click", gameloop.handleGameOption);
  });
}

export {
  toggleHover,
  renderGameboard,
  renderShipsContainer,
  renderPreparations,
};
