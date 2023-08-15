import Ship from "./Ship";

export default class Gameboard {
  SIZE = 10;

  grid = [];

  allShips = {};

  initiateGameboard() {
    this.grid = [];
    for (let i = 0; i < this.SIZE; i += 1) {
      const row = [];
      for (let j = 0; j < this.SIZE; j += 1) {
        row.push({
          markStatus: false,
          ship: false,
        });
      }
      this.grid.push(row);
    }

    // Reset all ships coords
    Object.values(this.allShips).forEach((ship) => {
      ship.coords = [];
    });

    this.allShips = {};
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
      this.grid[c[0]][c[1]].ship = false;
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

  receiveAttack(coord) {
    console.log(this.grid, coord);
  }

  checkGameOver() {
    console.log(this.grid);
  }
}
