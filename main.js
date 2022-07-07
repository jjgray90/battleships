const gameBoard = document.querySelector(".game-board");

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
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game.length; j++) {
      gameBoard.innerHTML += `<div id=${"g" + i + j}>${game[i][j]}</div>`;
    }
  }
};

drawBoard();

const getSquare = (event) => {
  console.log(event.target.id);

  let row = event.target.id.substr(1, 1);
  let column = event.target.id.substr(2, 1);
  game[row][column] = 1;
  console.log(game[row][column]);
  drawBoard();
};

gameBoard.addEventListener("click", getSquare);
