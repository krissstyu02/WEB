const boardWidth = 20; // Ширина игрового поля
const boardHeight = 20; // Высота игрового поля
const cellSize = 20; // Размер ячейки в пикселях

const board = []; // Игровое поле
let snake = []; // Змейка
let direction = "right"; // Направление движения змейки
let food = null; // Еда

let score = 0; // Счёт

function initGame() {
    // Создаём игровое поле
    for (let i = 0; i < boardHeight; i++) {
        board.push([]);
        for (let j = 0; j < boardWidth; j++) {
            board[i].push(0);
        }
    }

    // Создаём змейку
    const startX = Math.floor(boardWidth / 2);
    const startY = Math.floor(boardHeight / 2);
    for (let i = 0; i < 3; i++) {
        snake.push([startX + i, startY]);
        board[startY][startX + i] = 1;
    }

    // Создаём первую еду
    createFood();
}

function createFood() {
    // Генерируем случайную позицию для еды
    let foodX = Math.floor(Math.random() * boardWidth);
    let foodY = Math.floor(Math.random() * boardHeight);
    while (board[foodY][foodX] === 1) { // Проверяем, что на этой позиции нет змейки
        foodX = Math.floor(Math.random() * boardWidth);
        foodY = Math.floor(Math.random() * boardHeight);
    }
    food = [foodX, foodY]; // Запоминаем позицию еды
}

function updateGame() {
    // Сдвигаем змейку на одну ячейку в выбранном направлении
    let newHead = [snake[0][0], snake[0][1]];
    switch (direction) {
        case "up":
            newHead[1]--;
            break;
        case "down":
            newHead[1]++;
            break;
        case "left":
            newHead[0]--;
            break;
        case "right":
            newHead[0]++;
            break;
    }
    // Проверяем, не выходит ли змейка за границы поля
    if (newHead[0] < 0 || newHead[0] >= boardWidth || newHead[1] < 0 || newHead[1] >= boardHeight) {
        gameOver();
        return;
    }
    // Проверяем, не попадает ли змейка на своё тело
    if (board[newHead[1]][newHead[0]] === 1) {
        gameOver();
        return;
    }
    snake.unshift(newHead); // Добавляем новую голову змейки
    board[newHead[1]][newHead[0]] = 1; // Отмечаем её на игровом поле
    // Проверяем, не съела ли змейка еду
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
        score++; // Увеличиваем счёт
        createFood(); // Создаём новую еду
    } else {
        const tail = snake.pop(); // Удаляем хвост змейки
        board[tail[1]][tail[0]] = 0; // Стираем его с игрового поля
    }
}

function gameOver() {
    alert('Игра окончена! Ваш счёт: ${score}');
    location.reload(); // Перезагружаем страницу
}

// Обработка нажатий клавиш
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "down") {
                direction = "up";
            }
            break;
        case "ArrowDown":
            if (direction !== "up") {
                direction = "down";
            }
            break;
        case "ArrowLeft":
            if (direction !== "right") {
                direction = "left";
            }
            break;
        case "ArrowRight":
            if (direction !== "left") {
                direction = "right";
            }
            break;
    }
});

initGame(); // Инициализируем игру

setInterval(() => {
    updateGame(); // Обновляем игру
}, 200); // Интервал обновления игры (200 миллисекунд)

// Отрисовка игрового поля
const canvas = document.getElementById("canvas");
canvas.width = boardWidth * cellSize;
canvas.height = boardHeight * cellSize;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Отрисовка змейки
function drawSnake() {
    ctx.fillStyle = "#000";
    for (let i = 0; i < snake.length; i++) {
        const x = snake[i][0] * cellSize;
        const y = snake[i][1] * cellSize;
        ctx.fillRect(x, y, cellSize, cellSize);
    }
}

// Отрисовка еды
function drawFood() {
    ctx.fillStyle = "#f00";
    const x = food[0] * cellSize;
    const y = food[1] * cellSize;
    ctx.fillRect(x, y, cellSize, cellSize);
}

// Обновление экрана
function updateScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

setInterval(() => {
    updateScreen(); // Обновляем экран
}, 100); // Интервал обновления экрана (100 миллисекунд)