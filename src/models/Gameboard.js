import Ship from "./Ship";
import Cell from "./Cell";

export default class Gameboard {
  constructor(playerId) {
    this.playerId = playerId;
  }

  SIZE = 10;

  grid = [];

  lastAttack = [];

  hoveredCoords = [];

  isPreping = true;

  allShips = {
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

  initiateGameboard() {
    this.grid = [];
    for (let i = 0; i < this.SIZE; i += 1) {
      const row = [];
      for (let j = 0; j < this.SIZE; j += 1) {
        row.push(new Cell(this.playerId, i, j));
      }
      this.grid.push(row);
    }

    // Reset all ships
    Object.values(this.allShips).forEach((ship) => {
      ship.resetShipToOriginal();
    });
  }

  placeShip(name, axis, coords) {
    const theShip = this.allShips[name];
    coords.forEach((c, i) => {
      const cell = this.grid[c[0]][c[1]];
      cell.ship = {
        isStartCoord: i === 0,
        shipObj: theShip,
      };
    });

    theShip.axis = axis;
    theShip.coords = coords;
  }

  placeShipsFromCoords(ships) {
    Object.values(ships).forEach((s) => {
      this.placeShip(s.name, s.axis, s.coords);
    });
  }

  repositionShip(name, newAxis, newCoords) {
    const theShip = this.allShips[name];
    theShip.coords.forEach((c) => {
      const cell = this.grid[c[0]][c[1]];
      cell.ship = false;
    });

    this.placeShip(name, newAxis, newCoords);
  }

  // Can't take the function inside the Ship class cause the coords parameter is not of Ship object.
  static getAdjacentsForAxisX(coords) {
    const adjacents = [];

    const head = [coords[0][0], coords[0][1] - 1];
    const headNeighbor = [head[0] - 1, head[1]];
    const tail = [coords[0][0], coords[coords.length - 1][1] + 1];
    const tailNeighbor = [tail[0] + 1, tail[1]];

    adjacents.push(head, headNeighbor, tail, tailNeighbor);

    for (let i = 1; i !== coords.length + 2; i += 1) {
      adjacents.push([headNeighbor[0], headNeighbor[1] + i]);
      adjacents.push([tailNeighbor[0], tailNeighbor[1] - i]);
    }

    return adjacents;
  }

  static getAdjacentsForAxisY(coords) {
    const adjacents = [];

    const head = [coords[0][0] - 1, coords[0][1]];
    const headNeighbor = [head[0], head[1] - 1];
    const tail = [coords[coords.length - 1][0] + 1, coords[0][1]];
    const tailNeighbor = [tail[0], tail[1] + 1];

    adjacents.push(head, headNeighbor, tail, tailNeighbor);

    for (let i = 1; i !== coords.length + 2; i += 1) {
      adjacents.push([headNeighbor[0] + i, headNeighbor[1]]);
      adjacents.push([tailNeighbor[0] - i, tailNeighbor[1]]);
    }

    return adjacents;
  }

  areCoordsInGrid(coords) {
    return coords.every((c) => this.grid[c[0]] && this.grid[c[0]][c[1]]);
  }

  isValidLocation(shipName, shipAxis, coords) {
    if (!this.areCoordsInGrid(coords)) return false;

    let coordsToCheck;
    if (shipAxis === "x") {
      coordsToCheck = [...Gameboard.getAdjacentsForAxisX(coords), ...coords];
    } else {
      coordsToCheck = [...Gameboard.getAdjacentsForAxisY(coords), ...coords];
    }

    const isInvalid = coordsToCheck.some((c) => {
      const row = this.grid[c[0]];
      const pos = row ? row[c[1]] : false;

      return pos && pos.ship && pos.ship.shipObj.name !== shipName;
    });

    return !isInvalid;
  }

  static generateRandomNum(range) {
    return Math.floor(Math.random() * range);
  }

  generateRandomCoords(ship) {
    const coords = [
      [
        Gameboard.generateRandomNum(this.SIZE),
        Gameboard.generateRandomNum(this.SIZE),
      ],
    ];

    for (let i = 1; i < ship.shipLength; i += 1) {
      if (ship.axis === "x") {
        coords.push([coords[0][0], coords[0][1] + i]);
      } else {
        coords.push([coords[0][0] + i, coords[0][1]]);
      }
    }

    return coords;
  }

  shuffleShipsAxis() {
    Object.values(this.allShips).forEach((s) => {
      const randomNum = Gameboard.generateRandomNum(2);
      s.axis = randomNum === 0 || s.shipLength === 1 ? "x" : "y";
    });
  }

  randomizeBoard() {
    this.shuffleShipsAxis();
    Object.values(this.allShips).forEach((s) => {
      let isShipPlaced = false;
      while (!isShipPlaced) {
        const randomCoords = this.generateRandomCoords(s);
        if (this.isValidLocation(s.name, s.axis, randomCoords)) {
          this.placeShip(s.name, s.axis, randomCoords);
          isShipPlaced = true;
        }
      }
    });
  }

  isAttacked(coord) {
    const cell = this.grid[coord[0]][coord[1]];

    return cell.markStatus;
  }

  receiveAttack(coord) {
    if (this.lastAttack.length !== 0) {
      const cell = this.grid[this.lastAttack[0]][this.lastAttack[1]];
      cell.markStatus = "hit";
    }

    this.lastAttack = coord;
    const cellToAttack = this.grid[coord[0]][coord[1]];
    cellToAttack.markStatus = "last";
    const ship = cellToAttack.ship.shipObj;
    if (ship) {
      ship.hit();
      return true;
    }

    return false;
  }

  // Dummy version
  genAIAttackCoord() {
    const unattackedPositions = [];

    for (let row = 0; row < this.grid.length; row += 1) {
      for (let col = 0; col < this.grid[0].length; col += 1) {
        const cell = this.grid[row][col];
        if (!cell.markStatus) {
          unattackedPositions.push([row, col]);
        }
      }
    }

    const randomCoord = Math.floor(Math.random() * unattackedPositions.length);
    return unattackedPositions[randomCoord];
  }

  isGameOver() {
    return Object.values(this.allShips).every((ship) => ship.isSunk());
  }

  areAllShipsPlaced() {
    return Object.values(this.allShips).every((ship) => ship.coords.length > 0);
  }
}
