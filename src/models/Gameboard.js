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

  checkValidLocation(coords, shipLen) {
    if (coords.length !== shipLen) return false;

    const surroundingCoords = [];
    const isValidLocation = coords.some((coord) => {
      const n = [coord[0] - 1, coord[1]];
      const s = [coord[0] + 1, coord[1]];
      const e = [coord[0], coord[1] + 1];
      const w = [coord[0], coord[1] - 1];

      surroundingCoords.push(n, s, e, w);
      const isValid = surroundingCoords.some(
        (c) =>
          !coords.includes(c) &&
          this.gameboard[c[0]] &&
          this.gameboard[c[0]][c[1]] &&
          !this.gameboard[c[0]][c[1]].ship
      );

      return isValid;
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
