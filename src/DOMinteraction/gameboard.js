import Ship from "../models/Ship";

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

const renderShip = (ship) => {
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
     ${shipStyle} name="${ship.name}" draggable="true">
      ${shipCells.join("")}
    </div>
  `;

  return shipContainer;
};

// const renderCells = (container) => {

// };

const renderGameboard = (container, grid) => {
  container.innerHTML = "";

  for (let row = 0; row < grid.length; row += 1) {
    for (let col = 0; col < grid[0].length; col += 1) {
      let shipElem = "";
      if (grid[row][col].ship?.isStartCoord) {
        shipElem = renderShip(c.ship.shipObj);
      }

      const cell = `<div class="cell" row="${row}" col="${col}">${shipElem}</div>`;
      container.innerHTML += cell;
    }
  }

  // gameboard.forEach((c, i) => {
  //   let shipElem;
  //   if (c.ship?.isStartCoord) {
  //     shipElem = renderShip(c.ship.shipObj);
  //   } else {
  //     shipElem = "";
  //   }

  //   const cell = `<div class="cell" coord="${i}">${shipElem}</div>`;
  //   container.innerHTML += cell;
  // });
};

const resetShipsContainer = (container, allShips) => {
  container.innerHTML = "";
  container.innerHTML += `
                        <div class="ship-row">
                            <div class="carrier-container ship-container" name="carrier">
                                <div class="draggable draggable-x" name="carrier" draggable="true" style="grid-template-columns: repeat(4, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                        </div>
                        <div class="ship-row">
                            <div class="battleship-container ship-container" name="battleship1">
                                <div class="draggable draggable-x" name="battleship1" draggable="true" style="grid-template-columns: repeat(3, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                            <div class="battleship-container ship-container" name="battleship2">        
                                <div class="draggable draggable-x" name="battleship2" draggable="true" style="grid-template-columns: repeat(3, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                        </div>
                        <div class="ship-row">
                            <div class="submarine-container ship-container" name="submarine1">
                                <div class="draggable draggable-x" name="submarine1" draggable="true" style="grid-template-columns: repeat(2, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                            <div class="submarine-container ship-container" name="submarine2">
                                <div class="draggable draggable-x" name="submarine2" draggable="true" style="grid-template-columns: repeat(2, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                            <div class="submarine-container ship-container" name="submarine3">
                                <div class="draggable draggable-x" name="submarine3" draggable="true" style="grid-template-columns: repeat(2, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                        </div>
                        <div class="ship-row">
                            <div class="destroyer-container ship-container" name="destroyer1">
                                <div class="draggable draggable-x" name="destroyer1" draggable="true" style="grid-template-columns: repeat(1, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                            <div class="destroyer-container ship-container" name="destroyer2">
                                <div class="draggable draggable-x" name="destroyer2" draggable="true" style="grid-template-columns: repeat(1, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                            <div class="destroyer-container ship-container" name="destroyer3">
                                <div class="draggable draggable-x" name="destroyer3" draggable="true" style="grid-template-columns: repeat(1, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                            <div class="destroyer-container ship-container" name="destroyer4">
                                <div class="draggable draggable-x" name="destroyer4" draggable="true" style="grid-template-columns: repeat(1, var(--cell-width));">
                                    <div class="ship-cell"></div>
                                </div>
                            </div>
                        </div>
  `;
};

const resetGameboard = (container, gameboard) => {
  gameboard.initiateGameboard();
  renderGameboard(container, gameboard.grid);
};

export { renderGameboard, resetShipsContainer, resetGameboard };
