import Gameboard from "../models/Gameboard";
import Ship from "../models/Ship";

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
    const newShip = new Ship("carrier", 4, "x");
    testGameboard.placeShip(newShip, newShip.axis, coords);

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
    const newShip = new Ship("battleship", 3, "y");
    testGameboard.placeShip(newShip, newShip.axis, coords);

    expect(testGameboard.grid[4][4].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[5][4].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[6][4].ship.shipObj).toStrictEqual(newShip);
    expect(testGameboard.grid[4][4].ship.isStartCoord).toBeTruthy();
    expect(newShip.coords).toStrictEqual(coords);
    expect(newShip).toStrictEqual(testGameboard.allShips[newShip.name]);
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
    const ship = new Ship("carrier", 4, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-right corner", () => {
    const coords = [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
    ];
    const ship = new Ship("carrier", 4, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-left corner", () => {
    const coords = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const ship = new Ship("carrier", 4, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the bottom-left corner", () => {
    const coords = [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];
    const ship = new Ship("carrier", 4, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });

  test("Returns TRUE for ship (len 4, horizontal) at the top-left corner", () => {
    const coords = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    const ship = new Ship("carrier", 4, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, horizontal) at the bottom-left corner", () => {
    const coords = [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
    ];
  });
  test("Returns TRUE for ship (len 4, horizontal) at the bottom-right corner", () => {
    const coords = [
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
    ];
    const ship = new Ship("carrier", 4, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-right corner", () => {
    const coords = [
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
    ];
    const ship = new Ship("carrier", 4, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the bottom-left corner", () => {
    const coords = [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];
    const ship = new Ship("carrier", 4, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });

  test("Returns FALSE for Ship (len 4, vertical) outside the board (bottom-edge)", () => {
    const coords = [
      [7, 9],
      [8, 9],
      [9, 9],
      [10, 9],
    ];
    const ship = new Ship("carrier", 4, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });

  test("Returns FALSE for Ship (len 4, vertical) outside the board (top-edge)", () => {
    const coords = [
      [-2, 2],
      [-1, 2],
      [0, 2],
      [1, 2],
    ];
    const ship = new Ship("carrier", 4, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });

  test("Returns FALSE for Ship (len 4, horizontal) outside the board (left-edge)", () => {
    const coords = [
      [0, -2],
      [0, -1],
      [0, 0],
      [0, 1],
    ];
    const ship = new Ship("carrier", 4, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });

  test("Returns FALSE for Ship (len 4, horizontal) outside the board (right-edge)", () => {
    const coords = [
      [0, 9],
      [0, 10],
      [0, 11],
      [0, 12],
    ];
    const ship = new Ship("carrier", 4, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
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

    const ship1 = new Ship("carrier", 4, "y");
    const ship2 = new Ship("carrier", 4, "x");
    expect(
      testGameboard.isValidLocation(ship1.name, ship1.axis, coords1)
    ).toBeTruthy();
    expect(
      testGameboard.isValidLocation(ship2.name, ship2.axis, coords2)
    ).toBeTruthy();
  });
});

describe("Testing isValidLocation when the board is NOT empty", () => {
  const coords1 = [[1, 1]];
  const ship1 = new Ship("destroyer1", 1, "x");

  const coords2 = [
    [5, 2],
    [5, 3],
  ];
  const ship2 = new Ship("submarine1", 2, "x");

  const coords3 = [[9, 0]];
  const ship3 = new Ship("destroyer2", 1, "x");

  const coords4 = [
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  const ship4 = new Ship("battleship1", 3, "y");

  const coords5 = [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
  ];
  const ship5 = new Ship("carrier", 4, "y");

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
  const ship7 = new Ship("submarine2", 2, "x");

  beforeEach(() => {
    testGameboard.placeShip(ship1, ship1.axis, coords1);
    testGameboard.placeShip(ship2, ship2.axis, coords2);
    testGameboard.placeShip(ship3, ship3.axis, coords3);
    testGameboard.placeShip(ship4, ship4.axis, coords4);
    testGameboard.placeShip(ship5, ship5.axis, coords5);
    testGameboard.placeShip(ship6, ship6.axis, coords6);
    testGameboard.placeShip(ship7, ship7.axis, coords7);
  });
  test("Returns FALSE adjacent to the edges of the ship", () => {
    const coords = [[5, 7]];
    const ship = new Ship("destroyer3", 1, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });
  test("Returns FALSE adjacent to the corner of the ship ", () => {
    const coords = [
      [8, 1],
      [8, 2],
    ];
    const ship = new Ship("submarine3", 2, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });
  test("Returns TRUE adjacent to the corner of the ship ", () => {
    const coords = [
      [8, 2],
      [9, 2],
    ];
    const ship = new Ship("submarine3", 2, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns TRUE surrounded by ships", () => {
    const coords = [
      [3, 3],
      [3, 4],
      [3, 5],
    ];
    const ship = new Ship("battleship3", 3, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeTruthy();
  });
  test("Returns FALSE surrounded by ships", () => {
    const coords = [
      [1, 2],
      [1, 3],
      [1, 4],
    ];
    const ship = new Ship("battleship3", 3, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });
  test("Returns TRUE surrounded by ships at the left edge", () => {
    const coords = [
      [3, 1],
      [4, 1],
      [5, 1],
    ];
    const ship = new Ship("battleship3", 3, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });
  test("Returns TRUE surrounded by ships at the left edge", () => {
    const coords = [[8, 6]];
    const ship = new Ship("destroyer3", 1, "x");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });
  test("Returns TRUE surrounded by ships at the left edge", () => {
    const coords = [
      [7, 7],
      [8, 7],
      [9, 7],
    ];
    const ship = new Ship("battleship3", 3, "y");
    expect(
      testGameboard.isValidLocation(ship.name, ship.axis, coords)
    ).toBeFalsy();
  });

  test("Checking random functions", () => {
    console.log(testGameboard.generateShips());
  });

  test("Checking randomizeBoard", () => {
    testGameboard.randomizeBoard();
    console.log(testGameboard.grid);
  });
});
