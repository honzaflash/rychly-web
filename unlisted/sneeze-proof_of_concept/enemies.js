
const enemies = {
    3: {
        draw: (x, y) => {
            fill(10, 90, 85);
            circle(x * tileSize + tileSize/2,
                   y * tileSize + tileSize/2,
                   tileSize * 0.5);
        },
        shoot: (x, y, graphics) => {
            graphics.stroke(255, 150, 150);
            graphics.strokeWeight(4);
            graphics.line((x + 0.5) * tileSize - height * 2, (y + 0.5) * tileSize - height * 2,
                         (x + 0.5) * tileSize + width * 2,  (y + 0.5) * tileSize + width * 2);
            graphics.line((x + 0.5) * tileSize + height * 2, (y + 0.5) * tileSize - height * 2,
                         (x + 0.5) * tileSize - width * 2,  (y + 0.5) * tileSize + width * 2);
            // check if player is shot
            let dist = createVector(x, y).sub(createVector(player.x, player.y));
            if (createVector(1,1).dot(dist) === 0 || createVector(-1,1).dot(dist) === 0) {
                player.dead = true;
            }
        },
        desc: "no 3 shoots diagonally"
    },

    4: {
        draw: (x, y) => {
            fill(20, 90, 75);
            circle(x * tileSize + tileSize/2,
                   y * tileSize + tileSize/2,
                   tileSize * 0.5);
        },
        shoot: (x, y, graphics) => {
            graphics.stroke(255, 150, 150);
            graphics.strokeWeight(4);
            graphics.line(0,     (y + 0.5) * tileSize,
                         width, (y + 0.5) * tileSize);
            graphics.line((x + 0.5) * tileSize, 0,
                         (x + 0.5) * tileSize, height);
            // check if player is shot
            if (player.x === x || player.y === y) {
                player.dead = true;
            }
        },
        desc: "no 4 shoots vertically and horizontally"
    }
}

