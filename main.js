const gameContainer = document.querySelector(".game-container");
const userGameboard = document.querySelector(".game-board--user");
const computerGameboard = document.querySelector(".game-board--computer");
const gameSquare = document.querySelector(".game-board__square");
const playButton = document.querySelector(".game-button");
const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal-content__message");
const modalButton = document.querySelector("#modal-button");

let userGameClock = 0;
let computerGameClock = 0;

let ships = [5, 4, 3, 2, 3];
let shipCount = 0;

let hit = false;

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

let userGame = [
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

const displayModal = (message) => {
  modal.style.display = "flex";
  modalText.innerHTML = message;
};

const removeModal = () => {
  modal.style.display = "none";
};

const checkShips = (array, idFunc) => {
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

    console.table(checkArr);
  }
};

const drawBoard = (player, gameBoard) => {
  gameBoard.innerHTML = "";
  let squareClass = "";
  let shipClass = "";
  for (let r = 0; r < player.length; r++) {
    for (let c = 0; c < player.length; c++) {
      if (player === userGame && player[r][c] === 3) {
        squareClass = "ship";
      } else if (player === userGame && player[r][c] === 4) {
        squareClass = "hit";
        shipClass = "ship";
      } else if (player[r][c] === 4) {
        squareClass = "hit";
      } else if (player[r][c] === 1) {
        squareClass = "miss";
        shipClass = "";
      } else {
        squareClass = "";
        shipClass = "";
      }

      gameBoard.innerHTML += `<div class="game-board__square ${shipClass}" id=${
        "s" + r + c
      }><div class=${squareClass} id=${"s" + r + c}></div></div>`;
    }
  }
};

const checkVictory = () => {
  if (computerGameClock === 17) {
    setTimeout(() => displayModal("End of game, you lost!"), 200);
  } else if (userGameClock === 17) {
    setTimeout(() => displayModal("You Won!"), 200);
  }
};

const fireTorpedo = (event) => {
  let row = event.target.id.substr(1, 1);
  let column = event.target.id.substr(2, 1);

  if (computerGame[row][column] === 3) {
    computerGame[row][column] = 4;
    userGameClock++;
  } else if (computerGame[row][column] === 0) {
    computerGame[row][column] = 1;
  } else if (
    computerGame[row][column] === 1 ||
    computerGame[row][column] === 4
  ) {
    displayModal("You've already fired there!");
  }
  drawBoard(computerGame, computerGameboard);
  checkVictory();
  userGameClock !== 17 ? setTimeout(() => compTorpedo(), 1000) : "";
};

const compTorpedo = () => {
  if (
    hit === false ||
    hit[0] > 8 ||
    hit[1] > 8 ||
    userGame[hit[0]][hit[1]] == 4
  ) {
    hit = false;
    while (true) {
      let row = getRandomInt(8);
      let column = getRandomInt(8);
      if (userGame[row][column] == 3) {
        userGame[row][column] = 4;
        hit = [row + 1, column];
        computerGameClock++;
        break;
      } else if (userGame[row][column] == 0) {
        userGame[row][column] = 1;
        hit = false;
        break;
      }
    }
  } else if (hit !== false && userGame[hit[0]][hit[1]] == 3) {
    userGame[hit[0]][hit[1]] = 4;
    console.log(userGame[hit[0]][hit[1]]);
    hit = [hit[0] + 1, hit[1]];
    computerGameClock++;
  } else if (hit !== false && userGame[hit[0]][hit[1]] == 0) {
    userGame[hit[0]][hit[1]] = 1;
    hit = false;
  } else {
  }
  console.log(hit);
  drawBoard(userGame, userGameboard);
  checkVictory();
};
const alertHandler = () => {
  if (shipCount === 5) {
    displayModal("Place your Battleship! <br> (4 grid squares)");
  } else if (shipCount === 9) {
    displayModal("Place your Cruiser! <br> (3 grid squares)");
  } else if (shipCount === 12) {
    displayModal("Place your Submarine! <br> (3 grid squares)");
  } else if (shipCount === 15) {
    displayModal("Place your destroyer! <br> (2 grid squares)");
  } else if (shipCount === 17) {
    drawBoard(computerGame, computerGameboard);
    computerGameboard.style.display = "grid";

    setTimeout(() => displayModal("Let's play - You shoot first"), 500);
  }
};

const placeUserShips = (event) => {
  let row = event.target.id.substr(1, 1);
  let column = event.target.id.substr(2, 1);
  if (userGame[row][column] == 0 && shipCount < 17) {
    userGame[row][column] = 3;
    shipCount++;
    alertHandler();
  } else displayModal("You can't place anymore!");

  drawBoard(userGame, userGameboard);
};

const startGame = () => {
  computerGameboard.style.display = "none";
  shipCount = 0;
  userGameClock = 0;
  computerGameClock = 0;

  computerGame = [
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
  userGame = [
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

  placeShips();

  gameContainer.style.display = "flex";
  drawBoard(userGame, userGameboard);
  displayModal("Place your Carrier! <br> (5 grid squares)");
};

userGameboard.addEventListener("click", placeUserShips);
computerGameboard.addEventListener("click", fireTorpedo);
playButton.addEventListener("click", startGame);
if (modalButton) {
  modalButton.addEventListener("click", removeModal);
} else location.reload();
