import Gameboard from "./Gameboard";

export default class Player {
  constructor(id) {
    this.id = id;
  }

  isPlayerTurn = false;

  isWinner = false;

  togglePlayerTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  attack(gameboard, coord) {
    if (!this.isPlayerTurn || gameboard.isAttacked(coord)) {
      return false;
    }

    const didHitShip = gameboard.receiveAttack(coord);
    this.isPlayerTurn = didHitShip ? true : false;
    return didHitShip;
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
    const didHitShip = gameboard.receiveAttack(
      unattackedPositions[randomCoord]
    );
    this.isPlayerTurn = didHitShip ? true : false;
    return didHitShip;
  }

  static giveRandomTurn(players) {
    // const val = Gameboard.generateRandomNum(2);
    // players[0].isPlayerTurn = val === 0 ? true : false;
    // players[1].isPlayerTurn = val === 1 ? true : false;
    players[0].isPlayerTurn = true;
    players[1].isPlayerTurn = false;
  }
}
