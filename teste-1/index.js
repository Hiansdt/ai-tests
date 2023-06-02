// Game-playing AI using minimax algorithm for Tic-Tac-Toe

// The game board represented as an array
let board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

// Constants for the players
const humanPlayer = 'X';
const aiPlayer = 'O';

// Function to display the current game board
function displayBoard() {
  console.log(' | ' + board[0] + ' | ' + board[1] + ' | ' + board[2]+ ' | ');
  console.log('-------------');
  console.log(' | ' +board[3] + ' | ' + board[4] + ' | ' + board[5] + ' | ');
  console.log('-------------');
  console.log(' | ' +(board[6] + ' | ' + board[7] + ' | ' + board[8] + ' | '));
  console.log('');
}

// Function to check if a player has won
function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combination of winningCombinations) {
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      return true;
    }
  }

  return false;
}

// Function to check if the game is a draw
function checkDraw() {
  return !board.includes(' ');
}

// Function to evaluate the score of a given game state
function evaluate(board) {
  if (checkWinner(aiPlayer)) {
    return 1;
  } else if (checkWinner(humanPlayer)) {
    return -1;
  } else {
    return 0;
  }
}

// Function for the AI to make a move using the minimax algorithm
function aiMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === ' ') {
      board[i] = aiPlayer;
      let score = minimax(board, 0, false);
      board[i] = ' ';

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  board[bestMove] = aiPlayer;
}

// Minimax algorithm
function minimax(board, depth, isMaximizingPlayer) {
  if (checkWinner(aiPlayer)) {
    return 1;
  } else if (checkWinner(humanPlayer)) {
    return -1;
  } else if (checkDraw()) {
    return 0;
  }

  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === ' ') {
        board[i] = aiPlayer;
        let score = minimax(board, depth + 1, false);
        board[i] = ' ';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === ' ') {
        board[i] = humanPlayer;
        let score = minimax(board, depth + 1, true);
        board[i] = ' ';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Example usage
displayBoard(); // Display the initial empty board

// Human player's move
board[0] = humanPlayer; // Place 'X' in the center position
displayBoard(); // Display the board after human player's move

// AI player's move
aiMove();
displayBoard(); // Display the board after AI player's move

// ... Continue the game by alternating human player and AI player moves

board[2] = humanPlayer;
displayBoard();

aiMove();
displayBoard();

board[7] = humanPlayer;
displayBoard();

aiMove();
displayBoard();

board[5] = humanPlayer;
displayBoard();

aiMove();
displayBoard();

board[6] = humanPlayer;
displayBoard();

aiMove();
displayBoard();