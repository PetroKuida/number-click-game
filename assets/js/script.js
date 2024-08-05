document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements for easy access
    const gameBoard = document.getElementById('game-board');
    const difficultySelect = document.getElementById('difficulty');
    const difficultyLabel = document.getElementById('difficulty-label');
    const startBtn = document.getElementById('start-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    let numbers = [];
    let currentNumber = 1;
    let timer;
    let startTime;
    const bestTimes = {
        4: document.getElementById('best-easy'),
        5: document.getElementById('best-normal'),
        6: document.getElementById('best-hard')
    };

    // Initialize best scores from local storage
    let bestScores = {
        4: localStorage.getItem('best-easy') ? parseInt(localStorage.getItem('best-easy')) : null,
        5: localStorage.getItem('best-normal') ? parseInt(localStorage.getItem('best-normal')) : null,
        6: localStorage.getItem('best-hard') ? parseInt(localStorage.getItem('best-hard')) : null
    };

    // Update high score display on page load
    for (const [gridSize, timeElement] of Object.entries(bestTimes)) {
        if (bestScores[gridSize] !== null) {
            timeElement.textContent = bestScores[gridSize];
        }
    }

    // Event listeners for start and cancel buttons
    startBtn.addEventListener('click', runGame);
    cancelBtn.addEventListener('click', cancelGame);

    // Function to start the game
    function runGame() {
        const gridSize = parseInt(difficultySelect.value);
        numbers = shuffle(createNumbersArray(gridSize * gridSize));
        gameBoard.innerHTML = '';
        currentNumber = 1;
        createBoard(gridSize);
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'inline-block';
        difficultySelect.style.display = 'none';
        difficultyLabel.style.display = 'none';
        gameBoard.style.display = 'grid';
        startTimer();
    }

    // Function to create an array of numbers from 1 to size
    function createNumbersArray(size) {
        const array = [];
        for (let i = 1; i <= size; i++) {
            array.push(i);
        }
        return array;
    }

    // Function to create the game board based on grid size
    function createBoard(gridSize) {
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, auto)`;
        gameBoard.style.width = `${gridSize * 50}px`;  // Adjust width based on grid size
        numbers.forEach(number => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = number;
            cell.addEventListener('click', () => handleCellClick(cell, number));
            gameBoard.appendChild(cell);
        });
    }

    // Function to handle cell clicks during the game
    function handleCellClick(cell, number) {
        if (number === currentNumber) {
            cell.classList.add('hidden');
            currentNumber++;
            if (currentNumber > numbers.length) {
                clearInterval(timer);
                const timeTaken = Math.floor((Date.now() - startTime) / 1000);
                startBtn.style.display = 'inline-block';
                cancelBtn.style.display = 'none';
                difficultySelect.style.display = 'inline-block';
                difficultyLabel.style.display = 'inline-block';
                gameBoard.style.display = 'none';
                displayCompletionMessage(timeTaken);
                updateHighScore(timeTaken);
            }
        } else {
            const originalColor = cell.style.backgroundColor;
            cell.style.backgroundColor = '#ff4c4c';
            setTimeout(() => {
                cell.style.backgroundColor = originalColor;
            }, 500);
        }
    }

    // Function to shuffle an array so each game has unic game board
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to start the timer for the game
    function startTimer() {
        startTime = Date.now();
        timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById('time').textContent = elapsedTime;
        }, 1000);
    }

    // Function to update high score if new record is achieved
    function updateHighScore(timeTaken) {
        const gridSize = parseInt(difficultySelect.value);
        if (bestScores[gridSize] === null || timeTaken < bestScores[gridSize]) {
            bestScores[gridSize] = timeTaken;
            bestTimes[gridSize].textContent = timeTaken;
            localStorage.setItem(`best-${difficultySelect.options[difficultySelect.selectedIndex].text.toLowerCase().split(" ")[0]}`, timeTaken);
            alert("New best time!");
        }
    }

    // Function to cancel the current game and set everything back to initial state
    function cancelGame() {
        clearInterval(timer);
        gameBoard.innerHTML = '';
        startBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'none';
        difficultySelect.style.display = 'inline-block';
        difficultyLabel.style.display = 'inline-block';
        gameBoard.style.display = 'none';
        document.getElementById('time').textContent = '0';
        currentNumber = 1;
    }

    // Function to display completion message in form of alert when the game is finished
    function displayCompletionMessage(timeTaken) {
        let message = `Game Completed!\nTime Taken: ${timeTaken} seconds.`;
        alert(message);
    }
});