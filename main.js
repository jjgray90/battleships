const gameBoard = document.querySelector(".game-board");
const gameSquare = document.querySelector(".game-board__square");

const game = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const drawBoard = () => {
  gameBoard.innerHTML = "";

  for (let r = 0; r < game.length; r++) {
    for (let c = 0; c < game.length; c++) {
      if (game[r][c] === 1) {
        gameBoard.innerHTML += `<div class="game-board__square red" id=${
          "s" + r + c
        }>${game[r][c]}</div>`;
        console.log(game[r][c]);
      } else
        gameBoard.innerHTML += `<div class="game-board__square" id=${
          "s" + r + c
        }>${game[r][c]}</div>`;
    }
  }
};

const checkColor = () => {};

drawBoard();

const getSquare = (event) => {
  let row = event.target.id.substr(1, 1);
  let column = event.target.id.substr(2, 1);

  if (game[row][column] == 0) {
    game[row][column] = 1;
    event.target.style.backgroundColor = "rgb(255,0,0)";
  }
  console.dir(event.target.style.backgroundColor);
  drawBoard();
};

gameBoard.addEventListener("click", getSquare);
