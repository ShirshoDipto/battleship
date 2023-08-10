export default class Ship {
  numHits = 0;
  coords = [];

  constructor(name, shipLength, axis) {
    this.name = name;
    this.shipLength = shipLength;
    this.axis = axis;
  }

  hit() {
    this.numHits += 1;
  }

  isSunk() {
    return this.numHits === this.shipLength;
  }
}
