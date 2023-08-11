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
  }

  placeShip(newShip, coords) {
    coords.forEach((c, i) => {
      const pos = this.grid[c[0]][c[1]];
      pos.ship = {
        isStartCoord: i === 0 ? true : false,
        shipObj: newShip,
      };
    });

    this.allShips[newShip.name] = newShip;
    newShip.coords = coords;
  }

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
      adjacents.push([headNeighbor[0], headNeighbor[1] + i]);
      adjacents.push([tailNeighbor[0], tailNeighbor[1] - i]);
    }

    return adjacents;
  }

  AreCoordsInGrid(coords) {
    const val = coords.some((c) => {
      const row = this.grid[c[0]];
      if (row && row[c[1]]) {
        return false;
      }
      return true;
    });

    return !val;
  }

  isValidLocation(shipToPlace, coords) {
    if (!this.AreCoordsInGrid(coords)) return false;

    let coordsToCheck;
    if (shipToPlace.axis === "x") {
      coordsToCheck = [...this.getAdjacentsForAxisX(coords), ...coords];
    } else {
      coordsToCheck = [...this.getAdjacentsForAxisY(coords), ...coords];
    }

    // Check if at least one of the value in the adjacents array is invalid
    const isInvalid = coordsToCheck.some((c) => {
      const row = this.grid[c[0]];
      const pos = row ? row[c[1]] : false;

      return pos && pos.ship && pos.ship.shipObj.name !== shipToPlace.name;
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
