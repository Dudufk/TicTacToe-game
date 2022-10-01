const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMsgTxt = document.querySelector("[data-winning-msg-txt]");
const winningMsg = document.querySelector("[data-winning-msg]");
const restartButton = document.querySelector("[data-restart-button]");
const turnText = document.querySelector("[data-turn-text]");
const usersPage = document.querySelector("[data-users-name]");
const playBtn = document.querySelector("[data-play-btn]");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

let isCircleTurn;

let winCombination = [];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  isCircleTurn = false;
  winCombination = [];

  cellElements.forEach((ev) => {
    ev.classList.remove("circle");
    ev.classList.remove("x");
    ev.removeEventListener("click", handleClick);
    ev.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  cellElements.forEach((ev) => {
    ev.classList.remove("winCells");
  });
  turnText.classList.remove("hiddeTurnText");
  winningMsg.classList.remove("showWinningMessage");
}

function endGame(isDraw) {
  if (isDraw) {
    winningMsgTxt.innerText = "Empate!";
  } else {
    winCombination = winCombination.at(-1);
    winCombination.forEach((ev) => {
      cellElements[ev].classList.add("winCells");
    });

    if (isCircleTurn) {
      winningMsgTxt.innerText = player2.value + " Venceu!";
    } else {
      winningMsgTxt.innerText = player1.value + " Venceu!";
    }
  }

  turnText.classList.add("hiddeTurnText");
  winningMsg.classList.add("showWinningMessage");
}

function checkForWin(currentPlayer) {
  return winningCombinations.some((combination) => {
    winCombination.push(combination);
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
}

function checkForDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

function placeMark(cell, classToAdd) {
  cell.classList.add(classToAdd);
}

function setBoardHoverClass() {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
    turnText.innerText = `Vez de ${player2.value}`;
  } else {
    board.classList.add("x");
    turnText.innerText = `Vez de ${player1.value}`;
  }
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
}

function handleClick(ev) {
  // Marcar
  const cell = ev.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  // Verificar vitoria ou empate
  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // Alternar simbolo
    swapTurns();
  }
}

playBtn.addEventListener("click", () => {
  if (player1.value && player2.value) {
    startGame();
    usersPage.classList.add("hiddeNamePage");
  } else {
    alert("Favor Preencher os nomes dos jogadores");
  }
});

restartButton.addEventListener("click", startGame);
