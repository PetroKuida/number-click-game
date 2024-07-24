document.addEventListener('DOMContentLoaded', function () {
    const gameBoard = document.getElementById('game-board');
    const difficultySelect = document.getElementById('difficulty');
    const startBtn = document.getElementById('start-btn');

    let numbers = [];
    let currentNumber = 1;
    let timer;
    let startTime;
    const bestTimes = {
        4: document.getElementById('best-easy'),
        5: document.getElementById('best-normal'),
        6: document.getElementById('best-hard')
    };
    let bestScores = { 4: null, 5: null, 6: null };

    startBtn.addEventListener('click', runGame);

    function runGame() {
        const gridSize = parseInt(difficultySelect.value);
        numbers = shuffle(createNumbersArray(gridSize * gridSize));
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

    function handleCellClick(cell, number) {
        if (number === currentNumber) {
            cell.classList.add('hidden');
            currentNumber++;
            if (currentNumber > numbers.length) {
                clearInterval(timer);
                const timeTaken = Math.floor((Date.now() - startTime) / 1000);
                updateHighScore(timeTaken);
                startBtn.disabled = false;
            }
        } else {
            const originalColor = cell.style.backgroundColor;
            cell.style.backgroundColor = '#ff4c4c';
            setTimeout(() => {
                cell.style.backgroundColor = originalColor;
            }, 500);  // Duration of the color change
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startTimer() {
        startTime = Date.now();
        timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById('time').textContent = elapsedTime;
        }, 1000);
    }

    function updateHighScore(timeTaken) {
        const gridSize = parseInt(difficultySelect.value);
        if (bestScores[gridSize] === null || timeTaken < bestScores[gridSize]) {
            bestScores[gridSize] = timeTaken;
            bestTimes[gridSize].textContent = timeTaken;
        }
    }
})