// Constants
const canvas = document.getElementById("canvas");
const colors = ["red","orange","yellow","lime","green","teal","blue","navy","purple","maroon"];
const ctx = canvas.getContext("2d");
const CELL_SIZE = 10;
const restartbutton = document.getElementById("restartbutton");
const scoreval = document.getElementById("score");
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

// Snake color picker
let colorcon = 0;

// Food object
let food = {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
};

// Game State
let paused = false;

//Score keeping
let score = snake.body.length - 3;

//Speed modifier
let speedmod = 0;

// Game loop
function loop() {
    if (paused) {
        setTimeout(loop,50);
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
	speedmod = 2*Math.sqrt((snake.body[0].x-food.x)**2 + (snake.body[0].y-food.y)**2);

    // Check for collision with walls
    if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT) {
        alert("Game over!");
		restartbutton.style.display = "block";
        return;
    }

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
		let colided = true;
		while (colided == true) {
			food.x = Math.floor(Math.random() * WIDTH);
			food.y = Math.floor(Math.random() * HEIGHT);
			colided = false;
			for (let i = 0; i < snake.body.length; i++) {
				if (snake.body[i].x === food.x && snake.body[i].y === food.y) {
					--colorcon;
					console.log("Food spawned on snake.");
					colided = true;
				}
			}
		}
		score = snake.body.length - 3;
		scoreval.setAttribute('value', score);
    } else {
        snake.body.pop();
    }

    // Check for collision with self
    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            alert("Game over!");
			restartbutton.style.display = "block";
            return;
        }
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // Draw the snake's head
    ctx.fillStyle = "white";
    ctx.fillRect(snake.body[0].x * CELL_SIZE, snake.body[0].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    // Draw the snake
    ++colorcon;
    for (let i = 1; i < snake.body.length; i++) {
        ctx.fillStyle = colors[(colorcon-i)%colors.length];
        ctx.fillRect(snake.body[i].x * CELL_SIZE, snake.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    // Repeat
    setTimeout(loop, 50+speedmod);
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
	restartbutton.style.display = "none";
	loop();
}

// Handle keyboard input
document.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
        case 38: // Up arrow
            e.preventDefault();
            if ((snake.body[1].x !== snake.body[0].x) && (snake.body[1].y-1!==snake.body[0].y)) {
                snake.direction = "up";
            }
            break;
        case 40: // Down arrow
            e.preventDefault();
            if ((snake.body[1].x !== snake.body[0].x) && (snake.body[1].y+1!==snake.body[0].y)) {
                snake.direction = "down";
            }
            break;
        case 37: // Left arrow
            e.preventDefault();
            if ((snake.body[1].x-1 !== snake.body[0].x) && (snake.body[1].y!==snake.body[0].y)) {
                snake.direction = "left";
            }
            break;
        case 39: // Right arrow
            e.preventDefault();
            if ((snake.body[1].x+1 !== snake.body[0].x) && (snake.body[1].y!==snake.body[0].y)) {
                snake.direction = "right";
            }
            break;
        case 27: // Escape
            paused = !paused;
            if (paused === true) {
                canvas.style.borderColor = "gray";
            } else {
                canvas.style.borderColor = "white";
            }
            break;
    }
});

// Start the game loop
loop();
