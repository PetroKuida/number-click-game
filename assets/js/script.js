document.addEventListener('DOMContentLoaded', function () {
    startBtn.addEventListener('click', runGame);
})

const startBtn = document.getElementById('start-btn');
function runGame() {
    const gameBoard = document.getElementById('game-board');
    const difficultySelect = document.getElementById('difficulty');
    const gridSize = parseInt(difficultySelect.value);
    numbers = shuffle(createNumbersArray(gridSize * gridSize));
    gameBoard.innerHTML = '';
    currentNumber = 1;
    createBoard();
    startBtn.disabled = true;
    startTimer();
}

function createNumbersArray(size) {
    const array = [];
    for (let i = 1; i <= size; i++) {
        array.push(i);
    }
    return array;
}

function createBoard() {

}

function handleCellClick() {

}

function shuffle() {

}

function startTimer() {

}

function updateHighScore() {

}