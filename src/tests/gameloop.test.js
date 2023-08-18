import Ship from "../models/Ship";
import Gameboard from "../models/Gameboard";
import Player from "../models/Player";

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
    let previousCell = testGameboard.grid[3][3];
    currentCell = testGameboard.grid[2][2];
    expect(testGameboard.lastAttack).toStrictEqual([2, 2]);
    expect(currentCell.markStatus).toBe("last");
    expect(previousCell.markStatus).toBe("hit");
  });
});

describe("Testing randomize function", () => {
  for (let x = 0; x < 10; x += 1) {
    test("Generates multiple randomize board to verify it's functionality", () => {
      testGameboard.randomizeBoard();
      const allShips = testGameboard.allShips;

      const coordsForShips = [];

      Object.values(allShips).forEach((ship) => {
        ship.coords.forEach((c, i) => {
          const cell = testGameboard.grid[c[0]][c[1]];
          coordsForShips.push(JSON.stringify(c));
          expect(cell.ship).toBeTruthy();
          if (i === 0) {
            expect(cell.ship.isStartCoord).toBeTruthy();
          } else {
            expect(cell.ship.isStartCoord).toBeFalsy();
          }
        });
      });

      for (let row = 0; row < testGameboard.grid.length; row += 1) {
        for (let col = 0; col < testGameboard.grid[0].length; col += 1) {
          const cell = testGameboard.grid[row][col];
          if (cell.ship) {
            const colToVerify = JSON.stringify([row, col]);
            expect(coordsForShips.includes(colToVerify)).toBeTruthy();
          }
        }
      }
    });
  }
});
