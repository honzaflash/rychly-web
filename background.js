
const bgCanvas = (p) => {
    p.lineCount = 150;
    p.fieldRes = 0.001;
    // let gridCols;
    // let gridRows;
    // let forceField = [];

    p.setup = () => {
        p.canvas = p.createCanvas(document.body.scrollWidth, document.body.scrollHeight);
        p.canvas.position(0, 0);
        document.getElementById("defaultCanvas1").classList.add('canvas.background_canvas');
        document.getElementById("defaultCanvas1").classList.remove('p5Canvas');
        p.canvas.style('z-index', '-1');

        p.colorMode(HSB, 360, 100, 100, 100);
        p.frameRate(30);

        // gridCols = Math.floor(width / fieldRes);
        // gridRows = Math.floor(height / fieldRes);
        // for (let y = 0; y < gridRows; y++ ) {
        //     for (let x = 0; x < gridCols; x++) {
        //         forceField[y * gridCols + x] = map(y, 0, gridRows, 0, TWO_PI);
        //     }
        // }
    }

    p.draw = () => {
        p.background(8);
        
        p.randomSeed(42);
        for (let i = 0; i < p.lineCount; i++) {
            p.strokeWeight(2);
            p.stroke(100, 42, 60);
            p.drawLine(p.random(-100, p.width + 300), p.random(-300, p.height + 100), 20, 50);
        }
        // noStroke();
        // fill(100, 30, 98);
        // ellipseMode(CENTER);
        // ellipse(mouseX, mouseY, width * 0.2);
    }

    p.windowResized = () => {
        p.resizeCanvas(document.body.scrollWidth, document.body.scrollHeight);
        // gridCols = Math.floor(width / fieldRes);
        // gridRows = Math.floor(height / fieldRes);
    }

    // p.drawFieldDirections = () => {
    //     for (let y = 0; y < gridRows; y++ ) {
    //         for (let x = 0; x < gridCols; x++) {
    //             stroke(100);
    //             line(x * p.fieldRes,
    //                 y * p.fieldRes, 
    //                 8 * cos(forceField[y * gridCols + x]) + x * p.fieldRes,
    //                 8 * sin(forceField[y * gridCols + x]) + y * p.fieldRes);
    //         }
    //     }
    // }

    p.drawLine = (x, y, length, inc) => {
        p.noFill();
        p.beginShape();
        for (let i = 0; i < length; i++) {
            let angle = p.noise(x * p.fieldRes, y * p.fieldRes) * TWO_PI;

            p.curveVertex(x, y);
            x += inc * cos(angle);
            y += inc * sin(angle);
        }
        p.endShape();
    }
}

let bgP5 = new p5(bgCanvas);

// making sure that the canvas resizes when the body does
// (without the window being resized) like when elements are being added in
const observer = new MutationObserver(() => {
    bgP5.resizeCanvas(document.body.scrollWidth, document.body.scrollHeight);
    console.log('hey body changes');
});

document.addEventListener('readystatechange', (event) => {
    console.log('hey we ready');
    observer.observe(document.querySelector('#body'), {subtree: true, childList: true});
})

