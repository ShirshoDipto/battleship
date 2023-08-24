export default class Cell {
  constructor(playerId, row, col) {
    this.playerId = playerId;
    this.row = row;
    this.col = col;
  }

  markStatus = false;

  ship = false;
}
