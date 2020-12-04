
function keyPressed() {
    if (keyCode === ESCAPE) {
        menu = !menu;
        if (player.dead) restart();
    }


    if (inputTaken) return;
    let prevX = player.x;
    let prevY = player.y;
    if (keyCode === LEFT_ARROW) {
        player.x -= 1;
    } else if (keyCode === RIGHT_ARROW) {
        player.x += 1;
    } else if (keyCode === UP_ARROW) {
        player.y -= 1;
        
    } else if (keyCode === DOWN_ARROW) {
        player.y += 1;
    }
    // todo player out of bounds and in walls
    if (levelLayout[player.y * tileCount + player.x] === undefined ||
        levelLayout[player.y * tileCount + player.x] === 2) {
            player.x = prevX;
            player.y = prevY;
        }
    inputTaken = true;
}
