import * as prep from "./prepInterface";
import * as gameloop from "../index";

function renderGameplayScreen(container, players, gameboards) {
  container.innerHTML = `
                        <div class="main-wrapper">
                          <div class="main-top">
                            <p class="main-top-title">${
                              players[0].isPlayerTurn
                                ? "Your Turn"
                                : "Opponent's Turn"
                            }</p>
                          </div>
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
                                <button id="game-exit" class="play-button">Leave Game</button>
                              </div>             
                            </div>
                          </div>
                        </div>
                        `;

  const playerBoard = container.querySelector(".player-board-container");
  const opponentBoard = container.querySelector(".opponent-board-container");
  const leaveButton = container.querySelector("#game-exit");
  leaveButton.addEventListener("click", gameloop.handleBackHome);
  prep.renderGameboard(playerBoard, gameboards[0], players[0]);
  prep.renderGameboard(opponentBoard, gameboards[1], players[0]); // Make sure to give proper player Id
}

function renderRoomJoinDisplay(container) {
  container.innerHTML = `
                        <form class="code-form-container">
                          <label for="code-to-join" >
                            <h2 class="code-container-header">Enter the 4-digit code: </h2>
                          </label>
                          <input type="tel" id="code-to-join" maxlength="4" min="1000" max="9999" required class="code-container-code"/>
                          <div class="code-buttons-container">
                            <button type="reset" class="play-button">Cancel</button>
                            <button type="submit" class="play-button">Start</button>
                          </div>
                        </form>
                        `;

  const form = container.querySelector(".code-form-container");
  form.addEventListener("reset", gameloop.handleBackHome);
  form.addEventListener("submit", gameloop.handleGameJoin);
  container.querySelector(".code-container-code").focus();
}

function renderRoomIdDisplay(container, code) {
  container.innerHTML = `
                        <div class="share-code-container">
                          <h3 class="code-container-header">Share this code</h3>
                          <div class="code-container-code">${code}</div>
                          <div class="code-container-waiting">Waiting for your friend to join....</div>
                          <div class="code-buttons-container">
                            <button id="cancel-game-create" class="play-button">Cancel</button>
                          </div>
                        </div>
                        `;

  const cancel = container.querySelector("#cancel-game-create");
  cancel.addEventListener("click", gameloop.handleBackHome);
}

function handleGameOverRendering(container, players) {
  const mainTopTItle = container.querySelector(".main-top-title");
  mainTopTItle.textContent = players[0].isWinner
    ? "You have won!!"
    : "Opponent has won :(";

  const cells = container.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", gameloop.handlePlayerMove);
    cell.classList.remove("hover-effect");
  });
  const boards = container.querySelectorAll(".boards-wrapper > div");
  boards.forEach((b) => {
    b.classList.remove("opaqued");
  });

  setTimeout(() => {
    if (players[0].isWinner) {
      alert("You have won!!");
    } else {
      alert("Opponent has won :(");
    }
  }, 200);
}

export {
  renderGameplayScreen,
  handleGameOverRendering,
  renderRoomIdDisplay,
  renderRoomJoinDisplay,
};
