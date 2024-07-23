document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const difficultySelect = document.getElementById('difficulty');
    const startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', runGame);

    let numbers = [];
    let currentNumber = 1;

    function runGame() {
        const gridSize = parseInt(difficultySelect.value);
        //numbers = shuffle(createNumbersArray(gridSize * gridSize));
        gameBoard.innerHTML = '';
        currentNumber = 1;
        createBoard(gridSize);
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

    function createBoard(gridSize) {
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
        gameBoard.style.width = `${gridSize * 60}px`;  // Adjust width based on grid size
        numbers.forEach(number => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = number;
            cell.addEventListener('click', () => handleCellClick(cell, number));
            gameBoard.appendChild(cell);
        });
    }

    function handleCellClick() {

    }

    function shuffle() {

    }

    function startTimer() {

    }

    function updateHighScore() {

    }
})