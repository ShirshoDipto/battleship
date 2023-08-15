export default class Ship {
  numHits = 0;
  coords = [];
  isDraggable = true;
  distanceFromMidToMouse = [];

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
}
