const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const tileSize = 40;
const cols = canvas.width / tileSize; // 20
const rows = canvas.height / tileSize; // 15
const FPS = 60;
const frameTime = 1000 / FPS;

let levelMap = [];
let triggers = [];
let deathCount = 0;
let fallingBlocks = [];
let currentLevelIndex = 0;

// Game State & Controls
let isPaused = false;
const terminalDiv = document.getElementById('terminal');
const terminalInput = document.getElementById('terminal-input');
const hintButton = document.getElementById('hintButton');
const hintDisplay = document.getElementById('hintDisplay');
const endMenu = document.getElementById('endMenu');
const finalDeathCount = document.getElementById('finalDeathCount');
const restartButton = document.getElementById('restartButton');

let gameAnimFrame; // to store requestAnimationFrame id

// Player Setup
const player = {
    x: 50,
    y: 100,
    width: 30,
    height: 30,
    vx: 0,
    vy: 0,
    speed: 300,        // pixels per second
    jumpForce: -450,   // jump velocity
    gravity: 1200,     // pixels per second squared
    grounded: false
};

const levels = [
    {
        // Level 1: Immovable Wall
        setup: function () {
            // 0: empty, 1: solid block, 2: end goal, 3: hackable wall
            levelMap = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0]
            ];
            triggers = [];
        },
        hint: "sudo rm -rf /wall",
        onCommand: function (cmd) {
            if (cmd === 'sudo rm -rf /wall') {
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (levelMap[r][c] === 3) levelMap[r][c] = 0;
                    }
                }
                return true;
            }
            return false;
        }
    },
    {
        // Level 2: Low Gravity Jump
        setup: function () {
            levelMap = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
            ];
            triggers = [];
        },
        hint: "export GRAVITY=400",
        onCommand: function (cmd) {
            if (cmd === 'export GRAVITY=400') {
                player.gravity = 400;
                return true;
            }
            return false;
        }
    },
    {
        // Level 3: Locked Door
        setup: function () {
            // 0: empty, 1: solid block, 2: end goal, 4: locked door
            levelMap = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 4, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
            triggers = [];
        },
        hint: "sudo chmod 777 /door",
        onCommand: function (cmd) {
            if (cmd === 'sudo chmod 777 /door') {
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (levelMap[r][c] === 4) levelMap[r][c] = 0;
                    }
                }
                return true;
            }
            return false;
        }
    },
    {
        // Level 4: Speed Hack
        setup: function () {
            // Long gap that requires high speed
            levelMap = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1]
            ];
            triggers = [];
        },
        hint: "sysctl -w player.speed=800",
        onCommand: function (cmd) {
            if (cmd === 'sysctl -w player.speed=800') {
                player.speed = 800;
                return true;
            }
            return false;
        }
    },
    {
        // Level 5: Firewall + Low Gravity
        setup: function () {
            // 5: Firewall block, huge gap after it
            levelMap = [
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
                [1, 1, 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
            ];
            triggers = [];
        },
        hint: "sudo ufw disable && export GRAVITY=400",
        onCommand: function (cmd) {
            let success = false;

            // Allow chaining with && or running separately
            if (cmd.includes('sudo ufw disable')) {
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (levelMap[r][c] === 5) levelMap[r][c] = 0;
                    }
                }
                success = true;
            }
            if (cmd.includes('export GRAVITY=400')) {
                player.gravity = 400;
                success = true;
            }

            return success;
        }
    }
];

function loadLevel(index) {
    if (index >= levels.length) {
        showEndMenu();
        return;
    }

    currentLevelIndex = index;
    player.x = 50;
    player.y = 100;
    player.vx = 0;
    player.vy = 0;
    player.speed = 300; // Reset physics
    player.grounded = false;
    player.gravity = 1200; // Reset physics
    fallingBlocks = [];
    isPaused = false;

    levels[currentLevelIndex].setup();
    terminalDiv.style.display = 'none';
    if (hintDisplay) hintDisplay.style.display = 'none';
}

function showEndMenu() {
    isPaused = true;
    endMenu.style.display = 'block';
    finalDeathCount.textContent = deathCount;
    if (gameAnimFrame) cancelAnimationFrame(gameAnimFrame); // Stop loop entirely
}

restartButton.addEventListener('click', () => {
    endMenu.style.display = 'none';
    deathCount = 0;
    lastTime = performance.now(); // reset time to prevent deltaTime spike
    loadLevel(0);
    gameAnimFrame = requestAnimationFrame(gameLoop); // Restart the game loop
});

function resetCurrentLevel() {
    deathCount++;
    loadLevel(currentLevelIndex);
}

// Hint Button Logic
hintButton.addEventListener('click', () => {
    if (hintDisplay.style.display === 'none') {
        hintDisplay.textContent = "Astuce : " + levels[currentLevelIndex].hint;
        hintDisplay.style.display = 'block';
    } else {
        hintDisplay.style.display = 'none';
    }
    // Focus gameCanvas to avoid spacebar pressing the button
    canvas.focus();
});


// Controls
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    Space: false
};

window.addEventListener('keydown', (e) => {
    if (!isPaused && (e.code === 'KeyT' || e.key === 't' || e.key === 'T')) {
        isPaused = true;
        keys.ArrowLeft = false;
        keys.ArrowRight = false;
        keys.Space = false;
        terminalDiv.style.display = 'flex';
        terminalInput.value = '';
        setTimeout(() => terminalInput.focus(), 10);
        return;
    }

    if (isPaused) {
        if (e.code === 'Enter') {
            const cmd = terminalInput.value.trim();
            if (cmd === 'exit') {
                isPaused = false;
                terminalDiv.style.display = 'none';
                terminalInput.blur();
                return;
            }

            const success = levels[currentLevelIndex].onCommand(cmd);
            if (success) {
                isPaused = false;
                terminalDiv.style.display = 'none';
                terminalInput.blur();
            } else {
                terminalInput.value = ''; // clear on wrong cmd
            }
        }
        return; // Don't process game movement keys when paused
    }

    if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
    if (e.code === 'ArrowRight') keys.ArrowRight = true;
    if (e.code === 'Space') keys.Space = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
    if (e.code === 'ArrowRight') keys.ArrowRight = false;
    if (e.code === 'Space') keys.Space = false;
});

// Physics AABB
function checkAABB(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y;
}

function checkMapCollisions(px, py) {
    let tiles = [];
    const minCol = Math.floor(px / tileSize);
    const maxCol = Math.floor((px + player.width) / tileSize);
    const minRow = Math.floor(py / tileSize);
    const maxRow = Math.floor((py + player.height) / tileSize);

    for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
            if (r >= 0 && r < rows && c >= 0 && c < cols) {
                let cell = levelMap[r][c];
                // 1: block, 3: impassable wall, 4: locked door, 5: firewall
                if (cell === 1 || cell === 3 || cell === 4 || cell === 5) {
                    tiles.push({
                        x: c * tileSize,
                        y: r * tileSize,
                        width: tileSize,
                        height: tileSize,
                        type: cell
                    });
                } else if (cell === 2) {
                    // It's the goal! Do collision with goal
                    let goalRect = { x: c * tileSize, y: r * tileSize, width: tileSize, height: tileSize };
                    if (checkAABB({ x: px, y: py, width: player.width, height: player.height }, goalRect)) {
                        loadLevel(currentLevelIndex + 1); // Next Level
                        return []; // Abort collisions this frame
                    }
                }
            }
        }
    }
    return tiles;
}


// Main Update Loop
let lastTime = performance.now();

function update(deltaTime) {
    if (isPaused) return;

    // Horizontal Movement
    let moveX = 0;
    if (keys.ArrowLeft) moveX -= 1;
    if (keys.ArrowRight) moveX += 1;

    player.vx = moveX * player.speed;

    // Jump
    if (keys.Space && player.grounded) {
        player.vy = player.jumpForce;
        player.grounded = false;
    }

    // Gravity
    player.vy += player.gravity * deltaTime;

    // Attempt X
    player.x += player.vx * deltaTime;
    let collidersX = checkMapCollisions(player.x, player.y);
    for (let wall of collidersX) {
        if (checkAABB(player, wall)) {
            if (player.vx > 0) player.x = wall.x - player.width;
            else if (player.vx < 0) player.x = wall.x + wall.width;
            player.vx = 0;
        }
    }

    // Attempt Y
    player.y += player.vy * deltaTime;
    player.grounded = false;

    let collidersY = checkMapCollisions(player.x, player.y);
    for (let wall of collidersY) {
        if (checkAABB(player, wall)) {
            if (player.vy > 0) { // moving down
                player.y = wall.y - player.height;
                player.grounded = true;
            } else if (player.vy < 0) { // moving up
                player.y = wall.y + wall.height;
            }
            player.vy = 0;
        }
    }

    // Bounds Check Game Over
    if (player.y > canvas.height) {
        resetCurrentLevel();
        return;
    }
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Triggers logic (if any specific ones exist)
    for (let t of triggers) {
        if (t.active && checkAABB(player, t)) {
            t.onTrigger();
        }
    }
}

// Rendering
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = levelMap[r][c];
            if (cell === 1) {
                ctx.fillStyle = '#333';
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
                ctx.strokeStyle = '#222';
                ctx.strokeRect(c * tileSize, r * tileSize, tileSize, tileSize);
            } else if (cell === 3) {
                ctx.fillStyle = '#222'; // Wall hack
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
                ctx.strokeStyle = '#111';
                ctx.strokeRect(c * tileSize, r * tileSize, tileSize, tileSize);
            } else if (cell === 4) {
                ctx.fillStyle = '#C62828'; // Locked Door (redish)
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
                ctx.fillStyle = 'white';
                ctx.font = '20px Arial';
                ctx.fillText('x', c * tileSize + 14, r * tileSize + 26);
            } else if (cell === 5) {
                // Firewall (Orange with lines)
                ctx.fillStyle = '#FF5722';
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
                ctx.strokeStyle = '#E64A19';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(c * tileSize, r * tileSize + tileSize / 2);
                ctx.lineTo(c * tileSize + tileSize, r * tileSize + tileSize / 2);
                ctx.stroke();
            } else if (cell === 2) {
                ctx.fillStyle = '#4CAF50'; // Green finish
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

    ctx.fillStyle = '#FF5252';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Niveau: ' + (currentLevelIndex + 1) + ' / ' + levels.length, 10, 30);
    ctx.fillText('Morts: ' + deathCount, 150, 30);

    // Contrôles
    ctx.font = '14px Arial';
    ctx.fillText('Contrôles:', 10, 60);
    ctx.fillText('← → : Bouger', 10, 80);
    ctx.fillText('Espace : Sauter', 10, 100);
    ctx.fillText('T : Hack Terminal', 10, 120);
}

// Game Loop
function gameLoop(time) {
    let deltaTime = (time - lastTime) / 1000;
    if (deltaTime > 0.1) deltaTime = 0.1;
    lastTime = time;

    update(deltaTime);
    draw();

    gameAnimFrame = requestAnimationFrame(gameLoop);
}

// Start
loadLevel(0);
gameAnimFrame = requestAnimationFrame(gameLoop);
