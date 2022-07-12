const userGameboard = document.querySelector(".game-board--user");
const computerGameboard = document.querySelector(".game-board--computer");
const gameSquare = document.querySelector(".game-board__square");
let gameClock = 0;
const ships = [5, 4, 3, 2, 3];

const computerGame = [
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

const userGame = [
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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const checkShips = (array, ship) => {
  array.forEach((coord) =>
    computerGame[coord[0]][coord[1]] === 0
      ? (computerGame[coord[0]][coord[1]] = ship)
      : placeShips()
  );
};

const placeShips = () => {
  // loop through array. At each element, place a 3 in a single direction for until loop stops
  ships.forEach((ship) => {
    let rowStart = getRandomInt(9);
    let colStart = getRandomInt(9);
    const checkArr = [];

    if (rowStart <= ship) {
      for (i = ship; i > 0; i--) {
        checkArr.push([rowStart++, colStart]);
      }
      console.log(checkArr);
      checkShips(checkArr, ship);
    } else if (colStart <= ship) {
      for (i = ship; i > 0; i--) {
        checkArr.push([rowStart, colStart++]);
      }
      console.log(checkArr);
      checkShips(checkArr, ship);
    } else if (rowStart >= ship) {
      for (i = ship; i > 0; i--) {
        checkArr.push([rowStart--, colStart]);
      }
      console.log(checkArr);
      checkShips(checkArr, ship);
    } else if (colStart >= ship) {
      for (i = ship; i > 0; i--) {
        checkArr.push([rowStart, colStart--]);
      }
      console.log(checkArr);
      checkShips(checkArr, ship);
    }
  });
};

const drawBoard = (player, gameBoard) => {
  gameBoard.innerHTML = "";
  let squareClass = "";
  for (let r = 0; r < player.length; r++) {
    for (let c = 0; c < player.length; c++) {
      if (player === userGame && player[r][c] === 3) {
        squareClass = "ship";
        check = player[r][c];
      } else if (player[r][c] === 4) {
        squareClass = "hit";
        check = player[r][c];
      } else if (player[r][c] === 1) {
        check = player[r][c];
        squareClass = "miss";
      } else {
        squareClass = "";
        check = player[r][c];
      }

      gameBoard.innerHTML += `<div class="game-board__square ${squareClass}" id=${
        "s" + r + c
      }>${check}</div>`;
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
placeShips();
drawBoard(computerGame, computerGameboard);
drawBoard(userGame, userGameboard);
