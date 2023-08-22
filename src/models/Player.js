import Gameboard from "./Gameboard";

export default class Player {
  constructor(id, isPlayerTurn = false, roomId = "") {
    this.id = id;
    this.isPlayerTurn = isPlayerTurn;
    this.roomId = roomId;
  }

  isWinner = false;

  togglePlayerTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  attack(gameboard, coord) {
    if (!this.isPlayerTurn || gameboard.isAttacked(coord)) {
      throw new Error("this position is already been hit.");
    }

    const didHitShip = gameboard.receiveAttack(coord);
    this.isPlayerTurn = !!didHitShip;
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
    this.isPlayerTurn = didHitShip;
    return didHitShip;
  }

  static giveRandomTurn(players) {
    const val = Gameboard.generateRandomNum(2);
    players[0].isPlayerTurn = val === 0;
    players[1].isPlayerTurn = val === 1;
  }
}
