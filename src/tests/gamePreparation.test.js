import Gameboard from "../models/Gameboard";

let testGameboard;

beforeEach(() => {
  testGameboard = new Gameboard();
  testGameboard.initiateGameboard();
});

describe("Testing placeShip function", () => {
  test("places a ship from (0, 0) to (0, 4)", () => {
    const coords = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    testGameboard.placeShip("carrier", "x", coords);
    const newShip = testGameboard.allShips.carrier;

    expect(testGameboard.grid[0][0].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[0][1].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[0][2].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[0][3].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[0][0].ship.isStartCoord).toBeTruthy();
    expect(newShip.coords).toStrictEqual(coords);
    expect(newShip).toStrictEqual(testGameboard.allShips[newShip.name]);
  });
  test("places a ship from (4, 4) to (7, 4)", () => {
    const coords = [
      [4, 4],
      [5, 4],
      [6, 4],
    ];
    testGameboard.placeShip("battleship1", "y", coords);
    const newShip = testGameboard.allShips.battleship1;

    expect(testGameboard.grid[4][4].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[5][4].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[6][4].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[4][4].ship.isStartCoord).toBeTruthy();
    expect(newShip.coords).toStrictEqual(coords);
    expect(newShip).toStrictEqual(testGameboard.allShips[newShip.name]);
  });
});

describe("Testing repositionShip function", () => {
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

  test("Repositions ship from start coord [1, 4] to [8, 7]", () => {
    expect(testGameboard.grid[8][7].ship).toBeFalsy();
    testGameboard.repositionShip("submarine2", "x", [
      [8, 7],
      [8, 8],
    ]);

    expect(testGameboard.grid[1][4].ship).toBeFalsy();
    expect(testGameboard.grid[8][7].ship).toBeTruthy();
  });
});

describe("Testing isValidLocation when the board is empty", () => {
  test("Returns TRUE for ship (len 4, vertical) at the bottom-right corner", () => {
    const coords = [
      [6, 9],
      [7, 9],
      [8, 9],
      [9, 9],
    ];
    expect(testGameboard.isValidLocation("carrier", "y", coords)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-right corner", () => {
    const coords = [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
    ];
    expect(testGameboard.isValidLocation("carrier", "y", coords)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-left corner", () => {
    const coords = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    expect(testGameboard.isValidLocation("carrier", "y", coords)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the bottom-left corner", () => {
    const coords = [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];
    expect(testGameboard.isValidLocation("carrier", "y", coords)).toBeTruthy();
  });

  test("Returns TRUE for ship (len 4, horizontal) at the top-left corner", () => {
    const coords = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    expect(testGameboard.isValidLocation("carrier", "x", coords)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, horizontal) at the bottom-left corner", () => {
    const coords = [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
    ];
    expect(testGameboard.isValidLocation("carrier", "x", coords)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, horizontal) at the bottom-right corner", () => {
    const coords = [
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
    ];
    expect(testGameboard.isValidLocation("carrier", "x", coords)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-right corner", () => {
    const coords = [
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
    ];
    expect(testGameboard.isValidLocation("carrier", "x", coords)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the bottom-left corner", () => {
    const coords = [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];
    expect(testGameboard.isValidLocation("carrier", "x", coords)).toBeTruthy();
  });

  test("Returns FALSE for Ship (len 4, vertical) outside the board (bottom-edge)", () => {
    const coords = [
      [7, 9],
      [8, 9],
      [9, 9],
      [10, 9],
    ];
    expect(testGameboard.isValidLocation("carrier", "y", coords)).toBeFalsy();
  });
  test("Returns FALSE for Ship (len 4, vertical) outside the board (top-edge)", () => {
    const coords = [
      [-2, 2],
      [-1, 2],
      [0, 2],
      [1, 2],
    ];
    expect(testGameboard.isValidLocation("carrier", "y", coords)).toBeFalsy();
  });
  test("Returns FALSE for Ship (len 4, horizontal) outside the board (left-edge)", () => {
    const coords = [
      [0, -2],
      [0, -1],
      [0, 0],
      [0, 1],
    ];
    expect(
      testGameboard.isValidLocation("carrier", "x".axis, coords)
    ).toBeFalsy();
  });
  test("Returns FALSE for Ship (len 4, horizontal) outside the board (right-edge)", () => {
    const coords = [
      [0, 9],
      [0, 10],
      [0, 11],
      [0, 12],
    ];
    expect(testGameboard.isValidLocation("carrier", "x", coords)).toBeFalsy();
  });
  test("Returns TRUE for a ship that is placed anywhere in the middle", () => {
    const coords1 = [
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
    ];
    const coords2 = [
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
    ];
    expect(testGameboard.isValidLocation("carrier", "y", coords1)).toBeTruthy();
    expect(testGameboard.isValidLocation("carrier", "x", coords2)).toBeTruthy();
  });
});

describe("Testing isValidLocation when the board is NOT empty", () => {
  const coords1 = [[1, 1]];

  const coords2 = [
    [5, 2],
    [5, 3],
  ];

  const coords3 = [[9, 0]];

  const coords4 = [
    [5, 5],
    [6, 5],
    [7, 5],
  ];

  const coords5 = [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
  ];

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
    testGameboard.placeShip("destroyer2", "x", coords3);
    testGameboard.placeShip("battleship1", "y", coords4);
    testGameboard.placeShip("carrier", "y", coords5);
    testGameboard.placeShip("battleship2", "x", coords6);
    testGameboard.placeShip("submarine2", "x", coords7);
  });
  test("Returns FALSE adjacent to the edges of the ship", () => {
    const coords = [[5, 7]];
    expect(
      testGameboard.isValidLocation("destroyer3", "x", coords)
    ).toBeFalsy();
  });
  test("Returns FALSE adjacent to the corner of the ship ", () => {
    const coords = [
      [8, 1],
      [8, 2],
    ];
    expect(
      testGameboard.isValidLocation("submarine3", "x", coords)
    ).toBeFalsy();
  });
  test("Returns TRUE adjacent to the corner of the ship ", () => {
    const coords = [
      [8, 2],
      [9, 2],
    ];
    expect(
      testGameboard.isValidLocation("submarine3", "y", coords)
    ).toBeTruthy();
  });
  test("Returns TRUE surrounded by ships", () => {
    const coords = [
      [3, 3],
      [3, 4],
      [3, 5],
    ];
    expect(
      testGameboard.isValidLocation("battleship3", "x", coords)
    ).toBeTruthy();
  });
  test("Returns FALSE surrounded by ships", () => {
    const coords = [
      [1, 2],
      [1, 3],
      [1, 4],
    ];
    expect(
      testGameboard.isValidLocation("battleship3", "x", coords)
    ).toBeFalsy();
  });
  test("Returns TRUE surrounded by ships at the left edge", () => {
    const coords = [
      [3, 1],
      [4, 1],
      [5, 1],
    ];
    expect(
      testGameboard.isValidLocation("battleship3", "y", coords)
    ).toBeFalsy();
  });
  test("Returns TRUE surrounded by ships at the left edge", () => {
    const coords = [[8, 6]];
    expect(
      testGameboard.isValidLocation("destroyer3", "x", coords)
    ).toBeFalsy();
  });
  test("Returns TRUE surrounded by ships at the left edge", () => {
    const coords = [
      [7, 7],
      [8, 7],
      [9, 7],
    ];
    expect(
      testGameboard.isValidLocation("battleship3", "y", coords)
    ).toBeFalsy();
  });
});

describe("Testing board randomizing function", () => {
  test("Generates multiple randomize board (100)", () => {
    for (let x = 0; x < 100; x += 1) {
      testGameboard.initiateGameboard();
      testGameboard.randomizeBoard();
      const { allShips } = testGameboard;

      const coordsForShips = [];
      // eslint-disable-next-line no-loop-func
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
    }
  });
});
