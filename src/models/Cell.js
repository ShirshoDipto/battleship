export default class Cell {
  markStatus = false;

  ship = false;

  constructor(playerId) {
    this.playerId = playerId;
  }
}
