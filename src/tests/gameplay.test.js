import Gameboard from "../models/Gameboard";

let testGameboard;

beforeEach(() => {
  testGameboard = new Gameboard();
  testGameboard.initiateGameboard();
});

describe("Testing receiveAttack function", () => {
  const coords1 = [[1, 1]];
  const coords2 = [
    [5, 2],
    [5, 3],
  ];
  const coords3 = [
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  const coords4 = [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
  ];
  const coords5 = [[9, 0]];
  const coords6 = [
    [6, 7],
    [6, 8],
    [6, 9],
  ];
  const coords7 = [
    [1, 4],
    [1, 5],
  ];

  beforeEach(() => {
    testGameboard.placeShip("destroyer1", "x", coords1);
    testGameboard.placeShip("submarine1", "x", coords2);
    testGameboard.placeShip("battleship1", "y", coords3);
    testGameboard.placeShip("carrier", "y", coords4);
    testGameboard.placeShip("destroyer2", "x", coords5);
    testGameboard.placeShip("battleship2", "x", coords6);
    testGameboard.placeShip("submarine2", "y", coords7);
  });

  test("Attack on [3,3]", () => {
    expect(testGameboard.lastAttack.length).toBe(0);

    testGameboard.receiveAttack([3, 3]);
    const cellToAttack = testGameboard.grid[3][3];
    expect(cellToAttack.markStatus).toBe("last");
    expect(testGameboard.lastAttack).toStrictEqual([3, 3]);
  });

  test("Attack on [3,3] followed by [2,2]", () => {
    testGameboard.receiveAttack([3, 3]);
    let currentCell = testGameboard.grid[3][3];
    expect(testGameboard.lastAttack).toStrictEqual([3, 3]);
    expect(currentCell.markStatus).toBe("last");

    testGameboard.receiveAttack([2, 2]);
    const previousCell = testGameboard.grid[3][3];
    // eslint-disable-next-line prefer-destructuring
    currentCell = testGameboard.grid[2][2];
    expect(testGameboard.lastAttack).toStrictEqual([2, 2]);
    expect(currentCell.markStatus).toBe("last");
    expect(previousCell.markStatus).toBe("hit");
  });

  test("Attack on [1, 4] hits a ship", () => {
    testGameboard.receiveAttack([1, 4]);
    const cell = testGameboard.grid[1][4];
    expect(cell.ship.shipObj.numHits).toBe(1);
  });

  test("Attack on [6, 7] followed by [6, 8] and [6, 9] sinks a ship", () => {
    testGameboard.receiveAttack([6, 7]);
    testGameboard.receiveAttack([6, 8]);
    testGameboard.receiveAttack([6, 9]);
    const cell = testGameboard.grid[6][9];
    expect(cell.ship.shipObj.isSunk()).toBeTruthy();
  });

  test("Returns TRUE after hitting a ship", () => {
    expect(testGameboard.receiveAttack([6, 7])).toBeTruthy();
  });

  test("Returns FALSE after hitting blank position in the board", () => {
    expect(testGameboard.receiveAttack([6, 3])).toBeFalsy();
  });
});

describe("Testing isGameOver() function", () => {
  test("Shows game over when all ships have sunk", () => {
    testGameboard.randomizeBoard();
    const coordsOfShips = [];
    testGameboard.grid.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col.ship) {
          coordsOfShips.push([i, j]);
        }
      });
    });

    coordsOfShips.forEach((c) => {
      testGameboard.receiveAttack(c);
    });

    expect(testGameboard.isGameOver()).toBeTruthy();
  });

  test("Shows NOT game over when at least one ship is still ok. ", () => {
    testGameboard.randomizeBoard();
    const coordsOfShips = [];
    testGameboard.grid.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col.ship) {
          coordsOfShips.push([i, j]);
        }
      });
    });

    coordsOfShips.forEach((c, i) => {
      if (i !== 1) {
        testGameboard.receiveAttack(c);
      }
    });

    expect(testGameboard.isGameOver()).toBeFalsy();
  });
});

describe("Testing genAIAttack() function", () => {
  test("Generates random valid coordinates for attack on enemy board", () => {
    for (let i = 0; i < 100; i += 1) {
      const coord = testGameboard.genAIAttackCoord();
      expect(coord[0]).toBeGreaterThanOrEqual(0);
      expect(coord[0]).toBeLessThan(10);
      expect(coord[1]).toBeGreaterThanOrEqual(0);
      expect(coord[1]).toBeLessThan(10);
    }
  });
});
