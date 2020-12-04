const width = 720;
const height = width;

let osc;

let menu = true;

const tileCount = 10;
const tileSize = width / tileCount;

const speed = 2; // characters will move 'speed' times per second
const fpm = 8; // frames per move
const sneeze = 4; // sneeze every 'sneeze' moves
//      ^^^ it could vary level from level :O or by buying itmes

let overlay; // graphic layer

let levelLayout = [];

let inputTaken = false;
let player = {
    x: 0,
    y: 0,
    dead: false
}


function setup() {
    colorMode(HSB, 360, 100, 100);
    createCanvas(width, height).parent('game_canvas');
    overlay = createGraphics(width, height);
    frameRate(speed * fpm);
    background(30);

    osc = new p5.Oscillator(100, 'sawtooth');
    osc.amp(0);
    osc.start();

    // load JSON file with level layout
    loadLevelLayout();
}

function draw() {
    if (menu) {
        showMenu();
        return;
    }
    if (player.dead) {
        if (levelLayout[player.y * tileCount + player.x] === 1) {
            text('you won!\npress ESC to restart', width/2, height/2);
            return;
        }
        text('game over\npress ESC to restart', width/2, height/2);
        return;
    }

    for (let y = 0; y < tileCount; y++) {
        for (let x = 0; x < tileCount; x++) {
            if (levelLayout[y * tileCount + x] === 0) {
                drawFloor(x, y);
            } else if(levelLayout[y * tileCount + x] === 1 ) { // 1 is exit
                fill(50, 80, 80); // draw exit
                noStroke();
                rect(x * tileSize, y * tileSize, tileSize, tileSize);
                if (player.x === x && player.y === y) {
                    player.dead = true;
                }
            } else if(levelLayout[y * tileCount + x] === 2) {
                fill(30, 60, 50); // draw wall
                noStroke();
                rect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else {
                drawFloor(x, y);
                if (player.x === x && player.y === y) {
                    levelLayout[y * tileCount + x] = 0;
                    continue; // enemy killed
                }
                enemies[levelLayout[y * tileCount + x]].draw(x, y);
                if (frameCount % (fpm * sneeze) < 4) {
                    // TODO tie the timing to the players input
                    enemies[levelLayout[y * tileCount + x]].shoot(x, y, overlay);
                }
            }
        }
    }
    // beeping on the beat
    if (frameCount % fpm === 0) {
        osc.amp(0.1, 0.1);
        osc.amp(0, 0.1);
    }
    // reseting input inbetween beats
    if (frameCount % fpm === fpm / 2) {
        inputTaken = false;
    }

    drawPlayer();

    image(overlay, 0, 0);
    overlay.clear();
}


function drawFloor(x, y) {
    if (frameCount % (2 * fpm) >= fpm) {
        fill(40, 70, (x + y) % 2 === 0 ? 33 : 35); // checked pattern
    } else {
        fill(100, 70, (x + y) % 2 === 0 ? 33 : 35);
    }
    noStroke();
    rect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawPlayer() {
    // FIX player can dodge off beat (move twice within a beat)
    // like this: ..|o...|o..o|....|o...|o..
    fill(220, 90, 85);
    circle(player.x * tileSize + tileSize/2,
           player.y * tileSize + tileSize/2,
           tileSize * 0.6);
}

function loadLevelLayout() {
    $.getJSON("./lvl1.json", data => {
        levelLayout = data;
    });
}

function restart() {
    loadLevelLayout();
    player.x = 0;
    player.y = 0;
    player.dead = false;
}

function showMenu() {
    background(90);
    fill(5);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(width * 0.05);
    text('wanna play?\npress ESC then', width/2, height/2);
}
