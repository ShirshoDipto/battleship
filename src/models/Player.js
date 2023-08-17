export default class Player {
  isPlayerTurn = false;

  isWinner = false;

  constructor(id) {
    this.id = id;
  }

  isAttacked(grid, coord) {
    const cell = grid[coord[0]][coord[1]];

    return !cell.markStatus;
  }

  attack(gameboard, coord) {
    if (!this.isPlayerTurn || this.isAttacked(gameboard.grid, coord)) {
      return false;
    }

    gameboard.receiveAttack(coord);
    this.isPlayerTurn = false;
    return true;
  }

  // Dummy version
  genAIAttack(gameboard) {
    const unattackedPositions = [];

    for (let row = 0; row < gameboard.grid.length; row += 1) {
      for (let col = 0; col < gameboard.grid[0].length; col += 1) {
        const cell = gameboard.grid[row][col];
        if (!cell.markStatus) {
          unattackedPositions.push([row, col]);
        }
      }
    }

    const randomCoord = Math.floor(Math.random() * unattackedPositions.length);
    gameboard.receiveAttack(unattackedPositions[randomCoord]);
  }
}
