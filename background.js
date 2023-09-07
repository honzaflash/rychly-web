
const bgCanvas = (p) => {
    p.lineCount = 150;
    p.fieldRes = 0.001;

    p.scrollSens = 0.0008;

    // little object for a "floaty" scroll position
    p.scrollFloat = {
        pos: 0,
        acc: 0,
        speed: 0,
        update: () => {
            p.scrollFloat.acc = window.scrollY - p.scrollFloat.pos;
            p.scrollFloat.speed += p.scrollFloat.acc * 0.1;
            p.scrollFloat.pos += p.scrollFloat.speed;
            p.scrollFloat.speed *= 0.2;
        }
    }

    p.setup = () => {
        p.canvas = p.createCanvas(document.body.scrollWidth, document.body.scrollHeight);
        p.canvas.position(0, 0);
        document.getElementById("defaultCanvas1").classList.add('canvas.background_canvas');
        document.getElementById("defaultCanvas1").classList.remove('p5Canvas');
        p.canvas.style('z-index', '-1');

        p.colorMode(HSB, 360, 100, 100, 100);
        p.frameRate(30);
    }

    // the p5 draw loop
    p.draw = () => {
        // TODO make it not redraw everythin when the bg is not changing
        p.background(5);

        p.scrollFloat.update();
        
        p.randomSeed(42);
        for (let i = 0; i < p.lineCount; i++) {
            p.strokeWeight(2);
            p.stroke(100, 42, 60);
            p.drawLine(p.random(-100, p.width + 300), p.random(-300, p.height + 100), 20, 50);
        }
    }

    p.windowResized = () => {
        p.resizeCanvas(document.body.scrollWidth, document.body.scrollHeight);
    }

    // draw a curve led by perlin noise
    p.drawLine = (x, y, vertCount, vertDist) => {
        p.noFill();
        p.beginShape();
        for (let i = 0; i < vertCount; i++) {
            let angle = p.noise(x * p.fieldRes,
                                y * p.fieldRes,
                                p.scrollFloat.pos * p.scrollSens) * TWO_PI;

            p.curveVertex(x, y);
            // jump in a direction given by the noise
            x += vertDist * cos(angle);
            y += vertDist * sin(angle);
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

