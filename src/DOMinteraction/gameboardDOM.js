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
        shipElem = renderShip(grid[row][col].ship.shipObj);
      }

      const cell = `<div class="cell" row="${row}" col="${col}">${shipElem}</div>`;
      container.innerHTML += cell;
    }
  }
};

const renderShipsContainer = (container, allShips) => {
  const allShipsHTML = allShips.map((ship) => {
    return renderShip(ship);
  });

  container.innerHTML = "";
  container.innerHTML += `
                        <div class="ship-row">
                          <div class="len4-container ship-container" name="carrier">
                            ${allShipsHTML[0]}
                          </div>
                        </div>
                        <div class="ship-row">
                          <div class="len3-container ship-container" name="battleship1">
                            ${allShipsHTML[1]}
                          </div>
                          <div class="len3-container ship-container" name="battleship2">
                            ${allShipsHTML[2]}
                          </div>
                        </div>
                        <div class="ship-row">
                          <div class="len2-container ship-container" name="submarine1">
                            ${allShipsHTML[3]}
                          </div>
                          <div class="len2-container ship-container" name="submarine2">
                            ${allShipsHTML[4]}
                          </div>
                          <div class="len2-container ship-container" name="submarine3">
                            ${allShipsHTML[5]}
                          </div>
                        </div>
                        <div class="ship-row">
                          <div class="len1-container ship-container" name="destroyer1">
                            ${allShipsHTML[6]}
                          </div>
                          <div class="len1-container ship-container" name="destroyer2">
                            ${allShipsHTML[7]}
                          </div>
                          <div class="len1-container ship-container" name="destroyer3">
                            ${allShipsHTML[8]}
                          </div>
                          <div class="len1-container ship-container" name="destroyer4">
                            ${allShipsHTML[9]}
                          </div>
                        </div>
  `;
};

const resetGameboard = (container, gameboard) => {
  gameboard.initiateGameboard();
  renderGameboard(container, gameboard.grid);
};

export { renderGameboard, renderShipsContainer, resetGameboard };
