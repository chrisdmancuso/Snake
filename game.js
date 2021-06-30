window.onload = function () {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 15);
}

setUpVariables();

//Game function
function game() {

    updateVelocity();
    mapBoundary();
    createPlaySpace();
    createScoreboard();
    updatePlayer();
    redPellet();

}

//Create Variables
function setUpVariables() {

    //Player variables
    px = py = 10;
    xv = yv = 0;
    trail = [];
    tail = 5;

    //Utility variables
    lastKeyPressed = 0;
    score = 0;
    highScore = 0;
    paused = false;

    //Game variables
    gs = tc = 25;
    ax = ay = 15;
}

//Player velocity
function updateVelocity() {

    px += xv;
    py += yv;
}

//Map boundary
function mapBoundary() {

    //Define map boundaries
    if (px < 0) {
        px = tc - 1;
    }
    if (px > tc - 1) {
        px = 0;
    }
    if (py < 0) {
        py = tc - 1;
    }
    if (py > tc - 1) {
        py = 0;
    }
}

//Create playing space
function createPlaySpace() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
}

//Create score board
function createScoreboard() {

    ctx.font = "20px Arial";
    ctx.fillStyle = "white"
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, canv.width / 2, canv.height - 10);
    ctx.fillText("High Score: " + highScore, canv.width / 6, canv.height - 10);
    ctx.fillRect(0, canv.height - 40, canv.width, 1);
}

//Update player and trail
function updatePlayer() {

    //Update player
    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        //Check for collision. Reset if collision detected
        if (trail[i].x == px && trail[i].y == py) {
            tail = 5;
            score = 0;
            px = py = 10;
            xv = yv = 0;
            lastKeyPressed = 0;
        }
    }

    //Update trail
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift()
    }
}

//Red pellet collision and creation
function redPellet() {

    //Check collision
    if (ax == px && ay == py) {

        increaseScore();
        generatePellet();
    }

    //Generate initial red pellet
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

//Increase score
function increaseScore() {
    tail++;
    score += (trail.length * 2);

    //Check if highscore increases
    if (highScore <= score) {
        highScore = score
    }
}

//Generate a new red pellet
function generatePellet() {

    //Generate random position for new pellet
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);

    //Check for collision with player
    for (var i = 0; i < trail.length; i++) {
        if (trail[i].x == ax && trail[i].y == ay) {
            ax = Math.floor(Math.random() * tc);
            ay = Math.floor(Math.random() * tc);
        }
    }
}

//Controls
function keyPush(evt) {
    switch (evt.keyCode) {
        //Left
        case 37:
            if (lastKeyPressed == 39) {
                break;
            } else {
                xv = -1; yv = 0;
                lastKeyPressed = 37;
                break;
            }
        //Down
        case 38:
            if (lastKeyPressed == 40) {
                break;
            } else {
                xv = 0; yv = -1;
                lastKeyPressed = 38;
                break;
            }
        //Right
        case 39:
            if (lastKeyPressed == 37) {
                break;
            } else {
                xv = 1; yv = 0;
                lastKeyPressed = 39;
                break;
            }
        //Up
        case 40:
            if (lastKeyPressed == 38) {
                break;
            } else {
                xv = 0; yv = 1;
                lastKeyPressed = 40;
                break;
            }
        //Reset
        case 82:
            xv = 0; yv = 0;
            break;
    }
}