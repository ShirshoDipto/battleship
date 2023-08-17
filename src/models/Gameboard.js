import Ship from "./Ship";
import Cell from "./Cell";

export default class Gameboard {
  SIZE = 10;

  grid = [];

  lastAttack = [];

  allShips = {};

  constructor(playerId) {
    this.playerId = playerId;
  }

  initiateGameboard() {
    this.grid = [];
    for (let i = 0; i < this.SIZE; i += 1) {
      const row = [];
      for (let j = 0; j < this.SIZE; j += 1) {
        row.push(new Cell(this.playerId));
      }
      this.grid.push(row);
    }

    // Reset all ships coords
    Object.values(this.allShips).forEach((ship) => {
      ship.coords = [];
    });
  }

  placeShip(newShip, axis, coords) {
    coords.forEach((c, i) => {
      const pos = this.grid[c[0]][c[1]];
      pos.ship = {
        isStartCoord: i === 0,
        shipObj: newShip,
      };
    });

    newShip.axis = axis;
    newShip.coords = coords;
    this.allShips[newShip.name] = newShip;
  }

  repositionShip(theShip, newAxis, newCoords) {
    theShip.coords.forEach((c) => {
      const cell = this.grid[c[0]][c[1]];
      cell.ship = false;
    });

    this.placeShip(theShip, newAxis, newCoords);
  }

  // Can't take the function inside the Ship class cause the coords parameter is not of Ship object.
  getAdjacentsForAxisX(coords) {
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

  getAdjacentsForAxisY(coords) {
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

  AreCoordsInGrid(coords) {
    return coords.every((c) => this.grid[c[0]] && this.grid[c[0]][c[1]]);
  }

  isValidLocation(shipName, shipAxis, coords) {
    if (!this.AreCoordsInGrid(coords)) return false;

    let coordsToCheck;
    if (shipAxis === "x") {
      coordsToCheck = [...this.getAdjacentsForAxisX(coords), ...coords];
    } else {
      coordsToCheck = [...this.getAdjacentsForAxisY(coords), ...coords];
    }

    // Check if at least one of the value in the adjacents array is invalid
    const isInvalid = coordsToCheck.some((c) => {
      const row = this.grid[c[0]];
      const pos = row ? row[c[1]] : false;

      return pos && pos.ship && pos.ship.shipObj.name !== shipName;
    });

    return !isInvalid; // If none of them are invalid, the location is valid
  }

  generateRandomCoord() {
    return Math.floor(Math.random() * this.SIZE);
  }

  generateRandomAxis() {
    const num = Math.floor(Math.random() * 2);
    return num === 0 ? "x" : "y";
  }

  generateRandomCoords(ship) {
    const coords = [[this.generateRandomCoord(), this.generateRandomCoord()]];

    for (let i = 1; i < ship.shipLength; i += 1) {
      if (ship.axis === "x") {
        coords.push([coords[0][0], coords[0][1] + i]);
      } else {
        coords.push([coords[0][0] + i, coords[0][1]]);
      }
    }

    return coords;
  }

  shuffleShipsAxis(ships) {
    Object.values(ships).forEach((s) => {
      s.axis = this.generateRandomAxis();
    });
  }

  randomizeBoard(ships) {
    this.shuffleShipsAxis(ships);
    Object.values(ships).forEach((s) => {
      let isShipPlaced = false;
      while (!isShipPlaced) {
        const randomCoords = this.generateRandomCoords(s);
        if (this.isValidLocation(s.name, s.axis, randomCoords)) {
          this.placeShip(s, s.axis, randomCoords);
          isShipPlaced = true;
        }
      }
    });
  }

  receiveAttack(coord) {
    if (this.lastAttack.length !== 0) {
      const cell = this.grid[this.lastAttack[0]][this.lastAttack[1]];
      cell.markStatus = "hit";
    }

    this.lastAttack = coord;
    const cellToAttack = this.grid[coord[0]][coord[1]];
    cellToAttack.markStatus = "last";
  }

  isGameOver() {
    return this.allShips.every((ship) => ship.isSunk());
  }
}
