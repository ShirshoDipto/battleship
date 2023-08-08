import Gameboard from "../models/Gameboard";
import Ship from "../models/Ship";
import testGameboardArray from "./testGameboardArray";

let testGameboard = [];

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

  describe("Testing checkValidLocation function", () => {
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
});
