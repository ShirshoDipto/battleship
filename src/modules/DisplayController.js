import socket from "../socket";
import GameController from "./GameController";

export default function DisplayController() {
  let game = GameController();

  /** ---------- Screen Rendering ---------- */

  const showMark = (cell, cellData) => {
    if (cellData.ship && cellData.markStatus) {
      cell.innerHTML = `
                        <div class="cross-container">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="Cross"><path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z" fill="#ff0000" class="color000000 svgShape"></path></svg>
                        </div>
                        `;
    }

    if (cellData.markStatus === "hit" && !cellData.ship) {
      cell.classList.add("hit");
    } else if (cellData.markStatus === "last") {
      cell.classList.add("last");
    }
  };

  const renderShip = (container, ship, isPreparing) => {
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
                            <div class="draggable ${dragged} ${shipAxis} 
                            ${cursortype} ${sunkStyle}" ${shipStyle} 
                            name="${ship.name}" draggable="${isPreparing}">
                              ${shipCells.join("")}
                            </div>
                          `;
  };

  const renderPreparations = () => {
    const container = document.querySelector(".main");
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

    initPlayButtons();
    const board = game.gameboards[0];
    const player = game.players[0];
    renderShipsContainer(true, board.allShips);
    const boardContainer = document.querySelector(".board-container");
    renderGameboard(boardContainer, board, player);
  };

  const renderShipsContainer = (isShipShowing, ships) => {
    const shipsContainer = document.querySelector(".ships-container");
    shipsContainer.innerHTML = `
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
                                </div>
                              `;

    const shipContainers = document.querySelectorAll(".ship-container");
    shipContainers.forEach((c) => {
      const theShip = ships[c.getAttribute("name")];
      if (isShipShowing) {
        renderShip(c, theShip, true);
      }
    });

    initBoardOptionButtons();
    initListenersForShips(shipsContainer);
  };

  const renderShipsForCells = (cell, cellData, board, player) => {
    if (
      (cellData.ship?.isStartCoord && player.id === board.playerId) ||
      (cellData.ship?.isStartCoord && cellData.ship.shipObj.isSunk())
    ) {
      renderShip(cell, cellData.ship.shipObj, board.isPreping);
    } else if (
      player.id !== board.playerId &&
      !cellData.markStatus &&
      player.isPlayerTurn
    ) {
      cell.classList.add("hover-effect");
    }
  };

  const renderCells = (container, board, player) => {
    const { grid } = board;
    for (let row = 0; row < grid.length; row += 1) {
      for (let col = 0; col < grid[0].length; col += 1) {
        container.innerHTML += `<div class="cell" playerId="${board.playerId}" row="${row}" col="${col}"></div>`;
        const elem = container.querySelector(
          `[row="${row}"][col="${col}"].cell`
        );

        const cellData = grid[row][col];
        showMark(elem, cellData);
        renderShipsForCells(elem, cellData, board, player);
      }
    }

    if (board.isPreping) {
      initListenersForShips(container);
    }

    initCellsListeners(board, player);
  };

  const renderGameboard = (container, board, player) => {
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

                        <div class="main-grid"></div>
                        `;

    const mainGrid = container.querySelector(".main-grid");
    renderCells(mainGrid, board, player);
  };

  function renderGameplayScreen(players, gameboards) {
    const container = document.querySelector(".main");
    const p1RoomId = players[0].roomId;
    const p2RoomId = players[1].roomId;
    let subtitle = "";
    if (p1RoomId && p2RoomId && p1RoomId === p2RoomId) {
      subtitle = `(Room Id: ${players[0].roomId})`;
    }
    container.innerHTML = `
                          <div class="main-wrapper">
                            <div class="main-top">
                              <p class="main-top-title">${
                                players[0].isPlayerTurn
                                  ? "Your Turn"
                                  : "Opponent's Turn"
                              }</p>
                              <p class="main-top-subtitle">${subtitle}</p>
                            </div>
                            <div class="main-middle">
                              <div class="boards-wrapper">
                                <div class="player-board-container ${
                                  players[0].isPlayerTurn ? "opaqued" : ""
                                }"></div>
                                <div class="opponent-board-container ${
                                  players[1].isPlayerTurn ? "opaqued" : ""
                                }"></div>
                              </div>
                            </div>
                            <div class="main-bottom">
                              <div class="board-options-wrapper">
                                <div class="board-options-container">
                                  <button id="game-exit" class="play-button">Leave Game</button>
                                </div>             
                              </div>
                            </div>
                          </div>
                          `;

    const playerBoard = document.querySelector(".player-board-container");
    const opponentBoard = document.querySelector(".opponent-board-container");
    const leaveButton = document.querySelector("#game-exit");
    leaveButton.addEventListener("click", handleBackHome);
    renderGameboard(playerBoard, gameboards[0], players[0]);
    renderGameboard(opponentBoard, gameboards[1], players[0]); // Make sure to give proper player Id
  }

  const renderRoomJoinDisplay = () => {
    const container = document.querySelector(".main");
    container.innerHTML = `
                          <form class="code-form-container">
                            <label for="code-to-join" >
                              <h2 class="code-container-header">Enter the 4-digit code: </h2>
                            </label>
                            <input type="tel" id="code-to-join" maxlength="4" min="1000" max="9999" required class="code-container-code"/>
                            <div class="code-buttons-container">
                              <button type="reset" class="play-button">Cancel</button>
                              <button type="submit" class="play-button">Start</button>
                            </div>
                          </form>
                          `;

    container.querySelector(".code-container-code").focus();
  };

  const renderRoomIdDisplay = (code) => {
    const container = document.querySelector(".main");
    container.innerHTML = `
                          <div class="share-code-container">
                            <h3 class="code-container-header">Share this code</h3>
                            <div class="code-container-code">${code}</div>
                            <div class="code-container-waiting">Waiting for your friend to join....</div>
                            <div class="code-buttons-container">
                              <button id="cancel-game-create" class="play-button">Cancel</button>
                            </div>
                          </div>
                          `;
  };

  const handleGameOverRendering = () => {
    const mainTopTItle = document.querySelector(".main-top-title");
    mainTopTItle.textContent = game.players[0].isWinner
      ? "You have won !!"
      : "Opponent has won :(";

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.removeEventListener("click", handlePlayerMove);
      cell.classList.remove("hover-effect");
    });
    const boards = document.querySelectorAll(".boards-wrapper > div");
    boards.forEach((b) => {
      b.classList.remove("opaqued");
    });

    setTimeout(() => {
      if (game.players[0].isWinner) {
        alert("You have won!!");
      } else {
        alert("Opponent has won :(");
      }
    }, 200);
  };

  /** ---------- Helper functions for Drag and Drop ------------ */

  const getOriginalShipStatus = (elem, theShip) => {
    elem.classList.remove("dragging", "hide");
    theShip.distFromMidToMouse = [];
    theShip.isDraggable = false;
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

  const getCellsToVerify = (e, theShip) => {
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
  };

  const toggleHover = (coords, isShow) => {
    if (coords.length === 0) return;
    coords.forEach((c) => {
      const cell = document.querySelector(`[row="${c[0]}"][col="${c[1]}"]`);
      if (isShow) {
        cell.classList.add("hovered");
      } else {
        cell.classList.remove("hovered");
      }
    });
  };

  /** ---------- Drag and Drop Implementation --------------- */

  const storeMeasurements = (e) => {
    e.target.classList.add("dragging");
    const shipCells = e.target.querySelectorAll(".ship-cell");
    const theShip = game.gameboards[0].allShips[e.target.getAttribute("name")];

    shipCells.forEach((cell) => {
      const box = cell.getBoundingClientRect();
      const midCoord = [box.width / 2 + box.x, box.height / 2 + box.y];
      theShip.storeDists(e.clientX, e.clientY, midCoord);
    });
  };

  const displayDraggablePositions = (e) => {
    e.target.classList.add("hide");
    const board = game.gameboards[0];
    const ship = board.allShips[e.target.getAttribute("name")];
    if (ship.isSameDraggingPos(e)) return;

    const hoveredCells = getCellsToVerify(e, ship);
    const coords = getCoords(hoveredCells);

    if (
      coords.length === ship.shipLength &&
      board.isValidLocation(ship.name, ship.axis, coords)
    ) {
      ship.isDraggable = true;
      toggleHover(board.hoveredCoords, false);
      board.hoveredCoords = coords;
      toggleHover(board.hoveredCoords, true);
    } else {
      ship.isDraggable = false;
      toggleHover(board.hoveredCoords, false);
    }
  };

  const dropShip = (e) => {
    const board = game.gameboards[0];
    const ship = board.allShips[e.target.getAttribute("name")];

    if (!ship.isDraggable) {
      getOriginalShipStatus(e.target, ship);
      return;
    }

    game.placeShipOnBoard(ship);

    const elemAtPosition = getElemAtPosition(e, ship.distFromMidToMouse[0]);
    if (elemAtPosition.classList.contains("cell")) {
      elemAtPosition.appendChild(e.target);
      e.target.classList.add("dragged");
    }

    toggleHover(board.hoveredCoords, false);
    getOriginalShipStatus(e.target, ship);
  };

  function handleRotateShip() {
    const boardContainer = document.querySelector(".board-container");

    const ship = game.gameboards[0].allShips[this.getAttribute("name")];
    if (ship.coords.length === 0 || ship.shipLength === 1) return;

    if (game.rotateShip(ship)) {
      renderGameboard(
        boardContainer,
        game.gameboards[0],
        game.players[0],
        true
      );
    } else {
      this.classList.add("invalid");
      setTimeout(() => {
        this.classList.remove("invalid");
      }, 500);
    }
  }

  const handleAIAttackHelper = () => {
    const val = new Promise((resolve) => {
      setTimeout(() => {
        const coord = game.gameboards[0].genAIAttackCoord();
        const attackStatus = game.handlePlayerAttack(
          coord,
          game.gameboards[0],
          game.players[1]
        );
        resolve(attackStatus);
      }, 500);
    });

    return val;
  };

  const giveAIAttack = async () => {
    let attackStatus = await handleAIAttackHelper();
    renderGameplayScreen(game.players, game.gameboards);
    while (attackStatus === "hit") {
      attackStatus = await handleAIAttackHelper();
      renderGameplayScreen(game.players, game.gameboards);
    }

    if (attackStatus === "gameover") {
      handleGameOverRendering();
    }
  };

  const handleFndAttack = (coord) => {
    const attackStatus = game.handlePlayerAttack(
      coord,
      game.gameboards[0],
      game.players[1]
    );

    if (!attackStatus) return;

    renderGameplayScreen(game.players, game.gameboards);
    if (attackStatus === "gameover") {
      handleGameOverRendering();
    }
  };

  function handlePlayerMove() {
    const coord = [
      parseInt(this.getAttribute("row")),
      parseInt(this.getAttribute("col")),
    ];

    const attackStatus = game.handlePlayerAttack(
      coord,
      game.gameboards[1],
      game.players[0]
    );

    if (game.players[0].roomId && game.players[1].roomId) {
      socket.emit("attack", { code: game.players[0].roomId, coord });
    }

    if (!attackStatus) return;
    renderGameplayScreen(game.players, game.gameboards);
    if (
      attackStatus === "missed" &&
      !game.players[0].roomId &&
      !game.players[1].roomId
    ) {
      giveAIAttack();
    } else if (attackStatus === "gameover") {
      handleGameOverRendering();
    }
  }

  const handleBackHome = () => {
    if (game.isLeavingGame()) {
      socket.emit("leaveRoom", {
        roomId: game.players[0].roomId,
        isGameOver: false,
      });
    }

    game = GameController();
    game.initiateGameboard("you");
    renderPreparations(game.gameboards[0], game.players[0], true);
  };

  const joinGame = (e) => {
    e.preventDefault();
    const inputElem = document.getElementById("code-to-join");
    const { value } = inputElem;
    game.players[0].togglePlayerTurn();
    socket.emit("joinGame", {
      code: parseInt(value),
      player: game.players[0],
      board: game.gameboards[0],
    });
  };

  const handleGameCreate = (code) => {
    game.changePlayerRoomId(code);
    renderRoomIdDisplay(code);
    const cancel = document.querySelector("#cancel-game-create");
    cancel.addEventListener("click", handleBackHome);
  };

  const handleGameJoin = () => {
    renderRoomJoinDisplay();
    const form = document.querySelector(".code-form-container");
    form.addEventListener("reset", handleBackHome);
    form.addEventListener("submit", joinGame);
  };

  function handleGameOption() {
    if (!game.gameboards[0].areAllShipsPlaced()) {
      alert("Please place all your ships on board.");
      return;
    }

    game.gameboards[0].isPreping = false;
    if (this.id === "ai-game-button") {
      game.prepareGameVsAI();
      renderGameplayScreen(game.players, game.gameboards);
    } else if (this.id === "create-game-button") {
      socket.emit("createGame", {
        player: game.players[0],
        board: game.gameboards[0],
      });
    } else if (this.id === "join-game-button") {
      handleGameJoin();
    }
  }

  const randomizeBoard = () => {
    const boardContainer = document.querySelector(".board-container");
    const { board, player } = game.randomizeGameboardData();
    renderShipsContainer(false, board.allShips);
    renderGameboard(boardContainer, board, player);
  };

  const resetBoard = () => {
    const boardContainer = document.querySelector(".board-container");
    const board = game.resetBoardData();
    const player = game.players[0];
    renderGameboard(boardContainer, board, player, true);
    renderShipsContainer(true, board.allShips);
  };

  /** ------------ Initialize Event Listeners ------------ */

  const initBoardOptionButtons = () => {
    const randomizeButton = document.getElementById("board-randomize");
    const resetButton = document.getElementById("board-reset");

    randomizeButton.addEventListener("click", randomizeBoard);
    resetButton.addEventListener("click", resetBoard);
  };

  const initPlayButtons = () => {
    const playButtons = document.querySelectorAll(".play-button");
    playButtons.forEach((button) => {
      button.addEventListener("click", handleGameOption);
    });
  };

  const initListenersForShips = (container) => {
    const ships = container.querySelectorAll(".draggable");
    ships.forEach((s) => {
      s.addEventListener("dragstart", storeMeasurements);
      s.addEventListener("drag", displayDraggablePositions);
      s.addEventListener("dragend", dropShip);
      s.addEventListener("click", handleRotateShip);
    });
  };

  const initCellsListeners = (board, player) => {
    const cellsArray = Array.from(document.querySelectorAll(".cell"));
    cellsArray.forEach((cell) => {
      if (board.isPreping) {
        cell.addEventListener("dragover", (e) => e.preventDefault());
      }
    });

    const playerCells = cellsArray.filter(
      (c) => c.getAttribute("playerId") !== player.id
    );

    playerCells.forEach((pc) => {
      pc.addEventListener("click", handlePlayerMove);
    });
  };

  /** ----------- Socket events ------------ */

  window.addEventListener("beforeunload", () => {
    socket.emit("leaveRoom", game.players[0].roomId);
    socket.disconnect();
  });

  socket.on("created", handleGameCreate);

  socket.on("receiveAttack", handleFndAttack);

  socket.on("joined", ({ player, board }) => {
    game.startGameWithFnd(player, board);
    renderGameplayScreen(game.players, game.gameboards);
  });

  socket.on("receiveHostData", ({ player, board }) => {
    game.startGameWithFnd(player, board);
    renderGameplayScreen(game.players, game.gameboards);
  });

  /** -------- Homepage loading --------- */

  const loadHomepage = () => {
    socket.connect();
    const board = game.gameboards[0];
    board.initiateGameboard("you");

    renderPreparations();
  };

  loadHomepage();
}
