import Ship from "../models/Ship";
import Gameboard from "../models/Gameboard";

let testGameboard;

beforeEach(() => {
  testGameboard = new Gameboard();
  testGameboard.initiateGameboard();
});

describe("Testing receiveAttack function", () => {
  const coords1 = [[1, 1]];
  const ship1 = new Ship("destroyer1", 1, "x");

  const coords2 = [
    [5, 2],
    [5, 3],
  ];
  const ship2 = new Ship("submarine1", 2, "x");

  const coords3 = [
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  const ship3 = new Ship("battleship1", 3, "y");

  const coords4 = [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
  ];
  const ship4 = new Ship("carrier", 4, "y");

  const coords5 = [[9, 0]];
  const ship5 = new Ship("destroyer2", 1, "x");

  const coords6 = [
    [6, 7],
    [6, 8],
    [6, 9],
  ];
  const ship6 = new Ship("battleship2", 3, "x");

  const coords7 = [
    [1, 4],
    [1, 5],
  ];
  const ship7 = new Ship("submarine2", 2, "y");

  beforeEach(() => {
    testGameboard.placeShip(ship1, ship1.axis, coords1);
    testGameboard.placeShip(ship2, ship2.axis, coords2);
    testGameboard.placeShip(ship3, ship3.axis, coords3);
    testGameboard.placeShip(ship4, ship4.axis, coords4);
    testGameboard.placeShip(ship5, ship4.axis, coords5);
    testGameboard.placeShip(ship6, ship6.axis, coords6);
    testGameboard.placeShip(ship7, ship7.axis, coords7);
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
      const ships = {
        carrier: new Ship("carrier", 4, "x"),
        battleship1: new Ship("battleship1", 3, "x"),
        battleship2: new Ship("battleship2", 3, "x"),
        submarine1: new Ship("submarine1", 2, "x"),
        submarine2: new Ship("submarine2", 2, "x"),
        submarine3: new Ship("submarine3", 2, "x"),
        destroyer1: new Ship("destroyer1", 1, "x"),
        destroyer2: new Ship("destroyer2", 1, "x"),
        destroyer3: new Ship("destroyer3", 1, "x"),
        destroyer4: new Ship("destroyer4", 1, "x"),
      };

      testGameboard.randomizeBoard(ships);
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
