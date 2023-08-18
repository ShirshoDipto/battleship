import * as prep from "./prepInterface";

function renderGameplayScreen(container, players, gameboards) {
  container.innerHTML = `
                        <div class="main-wrapper">
                          <div class="main-top">${
                            players[0].isPlayerTurn
                              ? "Your Turn"
                              : "Opponent's Turn"
                          }</div>
                          <div class="main-middle">
                            <div class="boards-wrapper">
                              <div class="player-board-container ${
                                players[0].isPlayerTurn ? "opaqued" : ""
                              }"></div>
                              <div class="opponent-board-container ${
                                players[1].isPlayerTurn ? "opaqued" : ""
                              }"></div>
                            </div>
                          </div>
                          <div class="main-bottom">
                            <div class="board-options-wrapper">
                              <div class="board-options-container">
                                <a href="javascript:;" id="game-exit" class="board-option">Leave Game</a>
                              </div>             
                            </div>
                          </div>
                        </div>
                        `;

  const playerBoard = container.querySelector(".player-board-container");
  const opponentBoard = container.querySelector(".opponent-board-container");
  prep.renderGameboard(playerBoard, gameboards[0], players[0], false);
  prep.renderGameboard(opponentBoard, gameboards[1], players[0], false); //Make sure to give proper player Id
}

export { renderGameplayScreen };
