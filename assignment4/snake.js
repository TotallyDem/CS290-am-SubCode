// Constants
const canvas = document.getElementById("canvas");
const scoreboard = document.getElementById("score");
const ctx = canvas.getContext("2d");
const CELL_SIZE = 10;
const WIDTH = canvas.width / CELL_SIZE;
const HEIGHT = canvas.height / CELL_SIZE;

// Snake object
let snake = {
    body: [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 }
    ],
    direction: "right"
};

// Food object
let food = {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
};

// Game State
let paused = false;

// Game loop
function loop() {
    if (paused) {
        setTimeout(loop,100);
        return;
    }
    // Move the snake
    let head = { x: snake.body[0].x, y: snake.body[0].y };
    switch (snake.direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.body.unshift(head);

    // Check for collision with walls
    if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT) {
        alert("Game over!");
        reset();
        return;
    }

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * WIDTH);
        food.y = Math.floor(Math.random() * HEIGHT);
    } else {
        snake.body.pop();
    }

    // Check for collision with self
    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            alert("Game over!");
            reset();
            return;
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // Draw the snake's head
    ctx.fillStyle = "lime";
    ctx.fillRect(snake.body[0].x * CELL_SIZE, snake.body[0].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    // Draw the snake
    ctx.fillStyle = "white";
    for (let i = 1; i < snake.body.length; i++) {
        ctx.fillRect(snake.body[i].x * CELL_SIZE, snake.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    // Repeat
    setTimeout(loop, 100);
}

// Reset the game
function reset() {
    snake.body = [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 }
    ];
    snake.direction = "right";
    food.x = Math.floor(Math.random() * WIDTH);
    food.y = Math.floor(Math.random() * HEIGHT);
}

// Handle keyboard input
document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 38: // Up arrow
            e.preventDefault();
            if (snake.direction !== "down") {
                snake.direction = "up";
            }
            break;
        case 40: // Down arrow
            e.preventDefault();
            if (snake.direction !== "up") {
                snake.direction = "down";
            }
            break;
        case 37: // Left arrow
            e.preventDefault();
            if (snake.direction !== "right") {
                snake.direction = "left";
            }
            break;
        case 39: // Right arrow
            e.preventDefault();
            if (snake.direction !== "left") {
                snake.direction = "right";
            }
            break;
        case 27: // Escape
            paused = !paused;
            break;
    }
});

// Start the game loop
loop();
