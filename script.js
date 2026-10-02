// Get all the buttons
const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const restartButton = document.getElementById("restart");


// Board representation
let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];


// Game state
let gameOver = false;


// All possible winning combinations
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// Player clicks a cell
cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        // Don't allow moves after game ends
        if (gameOver) {
            return;
        }

        // Don't allow clicking an occupied cell
        if (board[index] !== "") {
            return;
        }

        // Player move
        board[index] = "X";
        cell.textContent = "X";

        // Check player win
        if (checkWinner("X")) {
            statusText.textContent = "You Win! 🎉";
            gameOver = true;
            return;
        }

        // Check draw
        if (checkDraw()) {
            statusText.textContent = "Draw! 🤝";
            gameOver = true;
            return;
        }

        // Computer's turn
        statusText.textContent = "Computer's turn...";

        // Small delay so the computer doesn't move instantly
        setTimeout(computerMove, 500);
    });

});


// Computer move
function computerMove() {

    if (gameOver) {
        return;
    }

    let move;


    // 1. Try to win
    move = findWinningMove("O");

    if (move !== -1) {
        makeComputerMove(move);
        return;
    }


    // 2. Block the player
    move = findWinningMove("X");

    if (move !== -1) {
        makeComputerMove(move);
        return;
    }


    // 3. Take the center
    if (board[4] === "") {
        makeComputerMove(4);
        return;
    }


    // 4. Take a random empty position
    let emptyCells = [];

    for (let i = 0; i < board.length; i++) {

        if (board[i] === "") {
            emptyCells.push(i);
        }

    }


    if (emptyCells.length > 0) {

        let randomIndex =
            Math.floor(Math.random() * emptyCells.length);

        move = emptyCells[randomIndex];

        makeComputerMove(move);
    }
}


// Make computer move
function makeComputerMove(index) {

    board[index] = "O";

    cells[index].textContent = "O";


    // Check computer win
    if (checkWinner("O")) {

        statusText.textContent = "Computer Wins! 🤖";

        gameOver = true;

        return;
    }


    // Check draw
    if (checkDraw()) {

        statusText.textContent = "Draw! 🤝";

        gameOver = true;

        return;
    }


    statusText.textContent = "Your turn (X)";
}


// Find a winning/blocking move
function findWinningMove(player) {

    for (let pattern of winningPatterns) {

        let [a, b, c] = pattern;


        // Player has two positions
        // and one empty position

        if (
            board[a] === player &&
            board[b] === player &&
            board[c] === ""
        ) {
            return c;
        }


        if (
            board[a] === player &&
            board[c] === player &&
            board[b] === ""
        ) {
            return b;
        }


        if (
            board[b] === player &&
            board[c] === player &&
            board[a] === ""
        ) {
            return a;
        }

    }

    return -1;
}


// Check whether a player has won
function checkWinner(player) {

    for (let pattern of winningPatterns) {

        let [a, b, c] = pattern;

        if (
            board[a] === player &&
            board[b] === player &&
            board[c] === player
        ) {
            return true;
        }

    }

    return false;
}


// Check draw
function checkDraw() {

    return !board.includes("");
}


// Restart game
restartButton.addEventListener("click", restartGame);


function restartGame() {

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    gameOver = false;

    statusText.textContent = "Your turn (X)";


    cells.forEach(cell => {
        cell.textContent = "";
    });
}