import Ship from "./Ship";

export default class Gameboard {
  gameboard = [];

  mostRecentAttack = [];

  initiateGameboard() {
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        row.push({
          isMarked: false,
          ship: "",
        });
      }

      this.gameboard.push(row);
    }
  }

  placeShip(coords) {
    const newShip = new Ship(coords.length);

    coords.forEach((coord) => {
      const cell = this.gameboard[coord[0]][coord[1]];
      cell.ship = newShip;
    });
  }

  getAdjacentsForAxisX(coords) {
    const adjacents = [];

    const head = [coords[0][0], coords[0][1] - 1];
    const headNeighbor = [head[0] - 1, head[1]];
    adjacents.push(head, headNeighbor);

    const tail = [];
    for (let i = 1; i !== coords.length + 1; i += 1) {
      adjacents.push([headNeighbor[0], headNeighbor[1] + i]);
    }

    const fourthCell = [coords[0][0], coords[0][1] - 1];
    const fifthCell = [head[0] - 1, head[1]];

    adjacents.push();
    adjacents.push([coords[0][0], coords[0][1] - 1]);
  }

  getAdjacentForAxisY(coords) {
    const start = [coords[0][0] + 1, coords[0][1]];
  }

  checkValidLocation(coords, shipLen) {
    if (coords.length !== shipLen) return false;

    const surroundingCoords = [];
    const isValidLocation = coords.some((coord) => {
      const n = [coord[0] - 1, coord[1]];
      const s = [coord[0] + 1, coord[1]];
      const e = [coord[0], coord[1] + 1];
      const w = [coord[0], coord[1] - 1];

      surroundingCoords.push(n, s, e, w);
      const isValid = surroundingCoords.some((c) => {
        console.log(!this.gameboard[c[0]][c[1]].ship);
        if (
          !coords.includes(c) &&
          this.gameboard[c[0]] &&
          this.gameboard[c[0]][c[1]] &&
          !this.gameboard[c[0]][c[1]].ship
        ) {
          return true;
        }
        return false;
      });

      return !isValid;
    });

    return isValidLocation;
  }

  receiveAttack(coord) {
    console.log(this.gameboard, coord);
  }

  checkGameOver() {
    console.log(this.gameboard);
  }
}
