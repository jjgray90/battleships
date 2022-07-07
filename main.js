const gameBoard = document.querySelector(".game-board");

const game = [
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
  ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
];

const drawBoard = () => {
  for (let i = 0; i < game.length; i++) {
    for (let j = 0; j < game.length; j++) {
      gameBoard.innerHTML += `<div id=${"g" + i + j}>${game[i][j]}</div>`;
    }
  }
};

drawBoard();

const getSquare = (event) => {
  console.log(event.target.id);
};

gameBoard.addEventListener("click", getSquare);
