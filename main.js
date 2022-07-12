const userGameboard = document.querySelector(".game-board--user");
const computerGameboard = document.querySelector(".game-board--computer");
const gameSquare = document.querySelector(".game-board__square");
let gameClock = 0;
let ships = [5, 4, 3, 2, 3];
let shipCount = 0;

let computerGame = [
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

const checkShips = (array, idFunc) => {
  console.log("hello");
  const duplicateMap = new Map();
  for (const item of array) {
    const id = idFunc(item);
    if (duplicateMap.has(id)) return 0;
    duplicateMap.set(id, item);
  }
  console.log(array);
  return 1;
};

const placeShips = () => {
  let isUnique = 0;
  let checkArr = [];

  while (true) {
    ships.forEach((ship) => {
      let rowStart = getRandomInt(8);
      let colStart = getRandomInt(8);

      if (rowStart < ship) {
        for (i = ship; i > 0; i--) {
          checkArr.push([rowStart++, colStart]);
        }
      } else if (colStart < ship) {
        for (i = ship; i > 0; i--) {
          checkArr.push([rowStart, colStart++]);
        }
      } else if (rowStart > ship) {
        for (i = ship; i > 0; i--) {
          checkArr.push([rowStart--, colStart]);
        }
      } else if (colStart > ship) {
        for (i = ship; i > 0; i--) {
          checkArr.push([rowStart, colStart--]);
        }
      }
    });

    isUnique = checkShips(checkArr, JSON.stringify);

    if (isUnique === 1 && checkArr.length === 17) {
      console.log("hooray");
      checkArr.forEach((coord) => {
        computerGame[coord[0]][coord[1]] = 3;
      });
      break;
    } else checkArr = [];
    // kill++;
    // console.log(kill, isUnique);
    console.table(checkArr);
  }
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
  setTimeout(() => compTorpedo(), 1000);
};

const compTorpedo = () => {
  let row = getRandomInt(8);
  let column = getRandomInt(8);

  if (userGame[row][column] == 3) {
    userGame[row][column] = 4;
  } else if (userGame[row][column] == 0) {
    userGame[row][column] = 1;
  }
  // else if (userGame[row][column] == 4 || userGame[row][column] == 1) {
  //   userGame[getRandomInt(8)][getRandomInt(8)];
  // }
  drawBoard(userGame, userGameboard);
};
const alertHandler = () => {
  if (shipCount === 5) {
    alert("Place your Battleship! (4 grid squares)");
  } else if (shipCount === 9) {
    alert("Place your Cruiser! (3 grid squares");
  } else if (shipCount === 12) {
    alert("Place your Submarine! (3 grid squares");
  } else if (shipCount === 15) {
    alert("Place your destroyer! (2 grid squares");
  } else if (shipCount === 17) {
    alert("Let's play - You shoot first");
  }
};

// const checkShipPlacement = (row, column) => {
//   console.log(userGame[row--][column]);
//   if (
//     ((shipCount > 1 && shipCount < 5) ||
//       (shipCount > 5 && shipCount < 9) ||
//       (shipCount > 9 && shipCount < 12) ||
//       (shipCount > 12 && shipCount < 15) ||
//       (shipCount > 15 && shipCount < 17)) &&
//     (userGame[row - 1][column] !== 3 ||
//       userGame[row + 1][column] !== 3 ||
//       userGame[row][column - 1] !== 3 ||
//       userGame[row][column + 1] !== 3)
//   ) {
//     alert("must place next to eachother");
//   }
// };

const placeUserShips = (event) => {
  let row = event.target.id.substr(1, 1);
  let column = event.target.id.substr(2, 1);
  if (userGame[row][column] == 0 && shipCount < 17) {
    console.log(userGame[row][column]);
    // checkShipPlacement(row, column);
    userGame[row][column] = 3;
    shipCount++;
    alertHandler();
  } else alert("You can't place anymore!");

  drawBoard(userGame, userGameboard);
};

window.addEventListener("load", alert("Place your Carrier! (5 grid squares)"));
userGameboard.addEventListener("click", placeUserShips);
computerGameboard.addEventListener("click", fireTorpedo);
placeShips();
drawBoard(computerGame, computerGameboard);
drawBoard(userGame, userGameboard);
