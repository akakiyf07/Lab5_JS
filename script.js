const gameContainer = document.getElementById('game-container');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('color');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');

let game, gridWidth, squareSize, seconds, score, timer;



function createSquare(size) {
    game.innerHTML = '';
    const square = document.createElement('div');
    square.className = 'square';
    square.style.width = size + 'px';
    square.style.height = size + 'px';
    square.style.backgroundColor = colorSelect.value;
    square.addEventListener('click', () => {
        increaseScore();
        resetTimer();
        moveSquare(square);
    });
    game.appendChild(square);
}

function startTimer() {
    timer = setInterval(() => {
        seconds--;
        timerDisplay.textContent = `Час: ${seconds} сек.`;
        if (seconds <= 0) {
            endGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    seconds = getSeconds();
    startTimer();
}

function getSeconds() {
    let difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            return 15;
        case 'medium':
            return 8;
        case 'hard':
            return 3;
        case 'hardcore':
            return 1.5;
        default:
            return 10;
    }
}

function increaseScore() {
    score++;
    scoreDisplay.textContent = `Очки: ${score}`;
}

function moveSquare(square) {
    const randomX = Math.floor(Math.random() * (game.offsetWidth - square.offsetWidth));
    const randomY = Math.floor(Math.random() * (game.offsetHeight - square.offsetHeight));
    square.style.left = randomX + 'px';
    square.style.top = randomY + 'px';
}


function endGame() {
    clearInterval(timer);
    alert(`Ви назбирали ${score} очок, вітаємо!`);
}

function startGame() {
    let difficulty = difficultySelect.value;
    switch (difficulty) {
        case 'easy':
            gridWidth = 4;
            squareSize = 60;
            break;
        case 'medium':
            gridWidth = 6;
            squareSize = 50;
            break;
        case 'hard':
            gridWidth = 9;
            squareSize = 40;
            break;
        case 'hardcore':
            gridWidth = 13.5;
            squareSize = 30;
            break;
        default:
            break;
    }

    score = 0;
    scoreDisplay.textContent = `Очки: ${score}`;
    seconds = getSeconds();
    timerDisplay.textContent = `Час: ${seconds} сек.`;
    game = document.getElementById('game');
    game.style.width = gridWidth * squareSize + 'px';
    game.style.height = gridWidth * squareSize + 'px';
    createSquare(squareSize);
    startTimer();
}

startButton.addEventListener('click', startGame);
