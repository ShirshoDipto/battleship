import Ship from "../models/Ship";

describe("Testing receiveAttack function", () => {
  const coords1 = [[1, 1]];
  const ship1 = new Ship("destroyer1", 1, "x");
  ship1.coords = coords1;

  const coords2 = [
    [5, 2],
    [5, 3],
  ];
  const ship2 = new Ship("submarine1", 2, "x");
  ship2.coords = coords2;

  const coords3 = [
    [5, 5],
    [6, 5],
    [7, 5],
  ];
  const ship3 = new Ship("battleship1", 3, "y");
  ship3.coords = coords3;

  const coords4 = [
    [8, 6],
    [8, 7],
    [8, 8],
  ];
  const ship4 = new Ship("battleship2", 3, "x");
  ship4.coords = coords4;

  // const coords6 = [
  //   [6, 7],
  //   [6, 8],
  //   [6, 9],
  // ];
  // const ship6 = new Ship("battleship2", 3, "x");

  // const coords7 = [
  //   [1, 4],
  //   [1, 5],
  // ];
  // const ship7 = new Ship("submarine2", 2, "y");

  // beforeEach(() => {
  //   testGameboard.placeShip(ship1, coords1);
  //   // testGameboard.placeShip(ship2, coords2);
  //   // testGameboard.placeShip(ship3, coords3);
  //   // testGameboard.placeShip(ship4, coords4);
  //   // testGameboard.placeShip(ship5, coords5);
  //   // testGameboard.placeShip(ship6, coords6);
  //   // testGameboard.placeShip(ship7, coords7);
  // });
  test("[[1,1]] doesn't change", () => {
    expect(ship1.getCoordsForRotation()).toStrictEqual([[1, 1]]);
  });

  test("[[5,2], [5,3]] changes to [[5,2], [6,2]]", () => {
    expect(ship2.getCoordsForRotation()).toStrictEqual([
      [5, 2],
      [6, 2],
    ]);
  });

  test("[[5,5], [6,5], [7,5]] changes to [[5,5], [5,6], [5,7]]", () => {
    expect(ship3.getCoordsForRotation()).toStrictEqual([
      [5, 5],
      [5, 6],
      [5, 7],
    ]);
  });

  test("Changes ship location at the bottom edge going outside of the board", () => {
    expect(ship4.getCoordsForRotation()).toStrictEqual([
      [8, 6],
      [9, 6],
      [10, 6],
    ]);
  });
});
