const userGameboard = document.querySelector(".game-board--user");
const computerGameboard = document.querySelector(".game-board--computer");
const gameSquare = document.querySelector(".game-board__square");
let gameClock = 0;
const ships = [5, 4, 3, 3, 2];

const userGame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const computerGame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 0, 0, 0, 3, 3, 3, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 0, 0, 3, 0, 0, 0, 0],
  [0, 3, 0, 0, 3, 0, 0, 3, 0],
  [0, 0, 0, 0, 3, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 3, 3, 3, 0, 0, 0],
];

const drawBoard = (player, gameBoard) => {
  gameBoard.innerHTML = "";
  let check = "";
  let torpedo = "";
  console.log(gameClock);
  for (let r = 0; r < player.length; r++) {
    for (let c = 0; c < player.length; c++) {
      if (player === userGame) {
        check = player[r][c];
      } else if (player === computerGame && player[r][c] === 4) {
        check = player[r][c];
        torpedo = "hit";
      } else if (player === computerGame && player[r][c] === 1) {
        check = player[r][c];
        torpedo = "miss";
      } else {
        check = "";
        torpedo = "";
      }

      gameBoard.innerHTML += `<div class="game-board__square ${torpedo}" id=${
        "s" + r + c
      }></div>`;
    }
  }

  if (gameClock === 17) {
    alert("End of game!");
  }
};

const fireTorpedo = (event) => {
  let row = event.target.id.substr(1, 1);
  let column = event.target.id.substr(2, 1);

  if (computerGame[row][column] == 3) {
    computerGame[row][column] = 4;
    gameClock++;
  } else if (computerGame[row][column] == 0) {
    computerGame[row][column] = 1;
  }
  drawBoard(computerGame, computerGameboard);
};

computerGameboard.addEventListener("click", fireTorpedo);
window.addEventListener("load", drawBoard(computerGame, computerGameboard));
window.addEventListener("load", drawBoard(userGame, userGameboard));
