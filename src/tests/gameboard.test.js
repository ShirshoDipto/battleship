import Gameboard from "../models/Gameboard";
import Ship from "../models/Ship";
import testGameboardArray from "./testGameboardArray";

let testGameboard;

beforeEach(() => {
  testGameboard = new Gameboard();
  testGameboard.initiateGameboard();
});

describe("Testing initiateGameboard function", () => {
  test("Initiates a gameboard", () => {
    expect(testGameboard.gameboard).toStrictEqual(testGameboardArray);
  });
});

describe("Testing placeShip function", () => {
  test("places a ship from (0, 0) to (0, 4)", () => {
    const coords = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    testGameboard.placeShip(coords);
    const newShip = new Ship(4);
    expect(testGameboard.gameboard[0][0].ship).toStrictEqual(newShip);
    expect(testGameboard.gameboard[0][1].ship).toStrictEqual(newShip);
    expect(testGameboard.gameboard[0][2].ship).toStrictEqual(newShip);
    expect(testGameboard.gameboard[0][3].ship).toStrictEqual(newShip);
  });

  test("places a ship at [(5, 5)]", () => {
    const coords = [[5, 5]];
    testGameboard.placeShip(coords);
    const newShip = new Ship(1);
    expect(testGameboard.gameboard[5][5].ship).toStrictEqual(newShip);
  });
});

describe("Testing checkValidLocation when the board is empty", () => {
  test("Returns TRUE for ship (len 4, vertical) at the bottom-right corner", () => {
    const coords = [
      [6, 9],
      [7, 9],
      [8, 9],
      [9, 9],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-right corner", () => {
    const coords = [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-left corner", () => {
    const coords = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the bottom-left corner", () => {
    const coords = [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, horizontal) at the top-left corner", () => {
    const coords = [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, horizontal) at the bottom-left corner", () => {
    const coords = [
      [9, 0],
      [9, 1],
      [9, 2],
      [9, 3],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, horizontal) at the bottom-right corner", () => {
    const coords = [
      [9, 6],
      [9, 7],
      [9, 8],
      [9, 9],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the top-right corner", () => {
    const coords = [
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the bottom-left corner", () => {
    const coords = [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });
  test("Returns TRUE for ship (len 4, vertical) at the bottom-left corner", () => {
    const coords = [
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeTruthy();
  });

  test("Returns FALSE for Ship (len 4, vertical) outside the board (bottom-edge)", () => {
    const coords = [
      [7, 9],
      [8, 9],
      [9, 9],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeFalsy();
  });

  test("Returns FALSE for Ship (len 4, vertical) outside the board (top-edge)", () => {
    const coords = [
      [0, 2],
      [1, 2],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeFalsy();
  });

  test("Returns FALSE for Ship (len 4, horizontal) outside the board (left-edge)", () => {
    const coords = [
      [0, 0],
      [0, 1],
    ];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeFalsy();
  });

  test("Returns FALSE for Ship (len 4, horizontal) outside the board (right-edge)", () => {
    const coords = [[0, 9]];
    expect(testGameboard.checkValidLocation(coords, 4)).toBeFalsy();
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
    expect(testGameboard.checkValidLocation(coords1, 4)).toBeTruthy();
    expect(testGameboard.checkValidLocation(coords2, 4)).toBeTruthy();
  });
});

describe("Testing checkValidLocation when the board is NOT empty", () => {
  const ship1 = [[1, 1]];
  const ship2 = [
    [5, 2],
    [5, 3],
  ];
  const ship3 = [[9, 0]];
  const ship4 = [
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  const ship5 = [
    [1, 7],
    [2, 7],
    [3, 7],
    [4, 7],
  ];
  const ship6 = [
    [6, 7],
    [6, 8],
    [6, 9],
  ];
  const ship7 = [
    [0, 9],
    [1, 9],
  ];

  beforeEach(() => {
    testGameboard.placeShip(ship1);
    testGameboard.placeShip(ship2);
    testGameboard.placeShip(ship3);
    testGameboard.placeShip(ship4);
    testGameboard.placeShip(ship5);
    testGameboard.placeShip(ship6);
    testGameboard.placeShip(ship7);
  });
  test.only("Returns FALSE adjacent to the edges of the ship", () => {
    const coords = [[5, 7]];
    expect(testGameboard.checkValidLocation(coords, 1)).toBeFalsy();
  });
  test("Returns FALSE adjacent to the corner of the ship ", () => {
    const coords = [
      [8, 1],
      [8, 2],
    ];
    expect(testGameboard.checkValidLocation(coords, 2)).toBeFalsy();
  });
});
