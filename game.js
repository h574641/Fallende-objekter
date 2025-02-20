let gameArea = document.getElementById('gameArea');
let player = document.getElementById('player');
let scoreDisplay = document.getElementById('score');
let score = 0;
let gameOver = false;

const playerSpeed = 10;
const objectSpeed = 3;

let playerX = 180;
let playerY = 560;

player.style.left = playerX + 'px';

function movePlayer(e) {
    if (e.key === 'ArrowLeft' && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (e.key === 'ArrowRight' && playerX < gameArea.offsetWidth - 40) {
        playerX += playerSpeed;
    }
    player.style.left = playerX + 'px';
}

function createFallingObject() {
    if (gameOver) return;

    const obj = document.createElement('div');
    obj.classList.add('fallingObject');
    obj.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
    gameArea.appendChild(obj);

    let objectY = 0;

    function moveObject() {
        if (gameOver) return;

        objectY += objectSpeed;
        obj.style.top = objectY + 'px';

        // Check for collision with player
        if (objectY > playerY && objectY < playerY + 40 && 
            parseInt(obj.style.left) > playerX && parseInt(obj.style.left) < playerX + 40) {
            gameOver = true;
            alert("Spill er over! Din poengsum: " + score);
        }

        // Remove object when it goes off-screen
        if (objectY > gameArea.offsetHeight) {
            score++;
            scoreDisplay.innerText = score;
            gameArea.removeChild(obj);
        }

        requestAnimationFrame(moveObject);
    }
    moveObject();
}

function startGame() {
    setInterval(createFallingObject, 1000);
}

window.addEventListener('keydown', movePlayer);

startGame();