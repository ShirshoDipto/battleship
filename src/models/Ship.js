export default class Ship {
  constructor(shipLength) {
    this.shipLength = shipLength;
  }

  numHits = 0;

  hit() {
    this.numHits += 1;
  }

  isSunk() {
    return this.numHits === this.shipLength;
  }
}
