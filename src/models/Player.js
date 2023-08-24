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

  static giveRandomTurn(players) {
    const val = Gameboard.generateRandomNum(2);
    players[0].isPlayerTurn = val === 0;
    players[1].isPlayerTurn = val === 1;
  }
}
