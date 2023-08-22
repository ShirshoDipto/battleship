export default class Ship {
  constructor(name, shipLength, axis) {
    this.name = name;
    this.shipLength = shipLength;
    this.axis = axis;
  }

  numHits = 0;

  coords = [];

  isDraggable = true;

  distFromMidToMouse = [];

  initialX = 0;

  initialY = 0;

  hit() {
    this.numHits += 1;
  }

  isSunk() {
    return this.numHits === this.shipLength;
  }

  getCoordsForRotation() {
    if (this.coords.length === 0) throw new Error("Ship is not on board yet.");

    const newCoords = [];
    this.coords.forEach((c, i) => {
      if (this.axis === "x") {
        newCoords.push([c[0] + i, this.coords[0][1]]);
      } else {
        newCoords.push([this.coords[0][0], c[1] + i]);
      }
    });

    return newCoords;
  }

  isSameDraggingPos(e) {
    const oldX = this.initialX;
    const oldY = this.initialY;
    const newX = e.clientX;
    const newY = e.clientY;
    this.initialX = newX;
    this.initialY = newY;
    return oldX === newX && oldY === newY;
  }

  resetShipToOriginal() {
    this.coords = [];
    this.axis = "x";
    this.distFromMidToMouse = [];
    this.isDraggable = true;
    this.initialX = 0;
    this.initialY = 0;
  }

  storeDists(x, y, coord) {
    this.distFromMidToMouse.push([x - coord[0], y - coord[1]]);
  }

  getOffset() {
    return 3 / this.shipLength;
  }
}
