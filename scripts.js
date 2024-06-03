document.addEventListener('DOMContentLoaded', () => {
    const playerGrid = document.getElementById('player-grid');
    const computerGrid = document.getElementById('computer-grid');
    const startButton = document.getElementById('start-button');
    const instructions = document.getElementById('instructions');
    const turnInfo = document.getElementById('turn-info');

    const width = 10;
    const playerSquares = [];
    const computerSquares = [];
    const shipArray = [2, 3, 3, 4, 5];

    let isGameOver = false;
    let currentPlayer = 'player';

    function createBoard(grid, squares) {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.dataset.id = i;
            grid.appendChild(square);
            squares.push(square);
        }
    }

    createBoard(playerGrid, playerSquares);
    createBoard(computerGrid, computerSquares);

    function placeShipsRandomly(squares) {
        shipArray.forEach(size => {
            let placed = false;
            while (!placed) {
                const direction = Math.floor(Math.random() * 2);
                const randomStart = Math.floor(Math.random() * squares.length);
                const increment = direction ? 1 : width;
                let validPlacement = true;
                for (let i = 0; i < size; i++) {
                    const index = randomStart + i * increment;
                    if (index >= squares.length || squares[index].classList.contains('ship')) {
                        validPlacement = false;
                        break;
                    }
                }
                if (validPlacement) {
                    for (let i = 0; i < size; i++) {
                        squares[randomStart + i * increment].classList.add('ship');
                    }
                    placed = true;
                }
            }
        });
    }

    placeShipsRandomly(playerSquares);
    placeShipsRandomly(computerSquares);

    computerGrid.addEventListener('click', (e) => {
        if (!isGameOver && currentPlayer === 'player') {
            const square = e.target;
            if (square.classList.contains('ship')) {
                square.classList.add('hit');
                turnInfo.textContent = 'You hit a ship!';
            } else {
                square.classList.add('miss');
                turnInfo.textContent = 'You missed!';
            }
            currentPlayer = 'computer';
            setTimeout(computerTurn, 1000);
        }
    });

    function computerTurn() {
        let validShot = false;
        while (!validShot) {
            const randomIndex = Math.floor(Math.random() * playerSquares.length);
            const square = playerSquares[randomIndex];
            if (!square.classList.contains('hit') && !square.classList.contains('miss')) {
                if (square.classList.contains('ship')) {
                    square.classList.add('hit');
                    turnInfo.textContent = 'Computer hit your ship!';
                } else {
                    square.classList.add('miss');
                    turnInfo.textContent = 'Computer missed!';
                }
                validShot = true;
                currentPlayer = 'player';
            }
        }
    }

    startButton.addEventListener('click', () => {
        instructions.textContent = 'Game started! Attack the enemy!';
        startButton.disabled = true;
    });
});
