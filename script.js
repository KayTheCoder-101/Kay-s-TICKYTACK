const board = document.getElementById('board');
const status = document.getElementById('status');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');

let currentPlayer = 'X';
let gameActive = true;
const cells = [];

// Win combos
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Init board
function initBoard() {
  board.innerHTML = '';
  cells.length = 0;
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleMove(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!gameActive || cell.textContent !== '') return;

  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    showResult(`🎉 Player ${currentPlayer} Wins!`);
    gameActive = false;
  } else if (isDraw()) {
    showResult(`🤝 It's a Draw!`);
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winCombos.some(combo =>
    combo.every(index => cells[index].textContent === player)
  );
}

function isDraw() {
  return cells.every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player X's turn`;
}

function showResult(message) {
  resultMessage.textContent = message;
  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
}

function startNewGame() {
  resetGame();
  initBoard();
  resultScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
}

// Initialize on load
initBoard();
