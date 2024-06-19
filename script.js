const mazeContainer = document.getElementById('maze-container');
const cells = [];

const mazeData = [
    [1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
];

const playerPosition = { x: 0, y: 0 };

function createMaze() {
    mazeContainer.innerHTML = '';

    for (let row = 0; row < mazeData.length; row++) {
        for (let col = 0; col < mazeData[row].length; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (mazeData[row][col] === 0) {
                cell.classList.add('wall');
            }
            if (row === 0 && col === 0) {
                cell.classList.add('start');
            }
            if (row === mazeData.length - 1 && col === mazeData[row].length - 1) {
                cell.classList.add('end');
            }
            mazeContainer.appendChild(cell);
            cells.push(cell);
        }
    }
}

function movePlayer(event) {
    const { key } = event;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (key === 'ArrowUp' && playerPosition.y > 0) {
        newY--;
    } else if (key === 'ArrowDown' && playerPosition.y < mazeData.length - 1) {
        newY++;
    } else if (key === 'ArrowLeft' && playerPosition.x > 0) {
        newX--;
    } else if (key === 'ArrowRight' && playerPosition.x < mazeData[0].length - 1) {
        newX++;
    }

    if (!cells[newY * mazeData[0].length + newX].classList.contains('wall')) {
        cells[playerPosition.y * mazeData[0].length + playerPosition.x].classList.remove('player');
        playerPosition.x = newX;
        playerPosition.y = newY;
        cells[playerPosition.y * mazeData[0].length + playerPosition.x].classList.add('player');
        if (playerPosition.x === mazeData[0].length - 1 && playerPosition.y === mazeData.length - 1) {
            alert('Congratulations! You reached the end of the maze.');
        }
    }
}

document.addEventListener('keydown', movePlayer);
createMaze();
