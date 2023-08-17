export default class Ship {
  numHits = 0;

  coords = [];

  isDraggable = true;

  distanceFromMidToMouse = [];

  initialX = 0;

  initialY = 0;

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

  resetShipToOriginal() {
    this.coords = [];
    this.axis = "x";
    this.distanceFromMidToMouse = [];
    this.isDraggable = true;
    this.initialX = 0;
    this.initialY = 0;
  }
}
