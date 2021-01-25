const velMag = 2, dLifetime = 0.025;
let deltaY = 0, looping = true;

class Particle {
    constructor () {
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(random(-1, 1), random(-1, 1)).mult(velMag);
        this.lifetime = undefined;
    }

    run () {
        if (this.lifetime !== undefined) {
            this.lifetime -= dLifetime;
        }

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(velMag);

        if (this.pos.x < 0 && this.vel.x < 0 || this.pos.x > width && this.vel.x > 0) {
            this.vel.x *= -1;
        }

        if (this.pos.y + deltaY < 0 && this.vel.y < 0 || this.pos.y + deltaY > height && this.vel.y > 0) {
            this.vel.y *= -1;
        }
    }

    lifeleft () {
        return this.lifetime !== undefined ? this.lifetime : 1;
    }
}

let canvas, particles = [], particleCount = 40, thresholdDist = 40;

function setup() {
    let content_wrapper = document.getElementsByClassName('content-wrapper')[0];
    let rect = content_wrapper.getBoundingClientRect();
    let x = rect.left, y = rect.top, w = (rect.right - rect.left), h = (rect.bottom - rect.top)

    canvas = createCanvas(w, h);
    canvas.style('display', 'block');
    canvas.position(x, y);

    frameRate(60);

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(34, 34, 36);
    strokeWeight(4);

    for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
            let distance = (particles[i].pos.copy()).sub(particles[j].pos).mag();
            if (distance < thresholdDist) {
                stroke(255, map(distance, 0, thresholdDist, 255, 32) * particles[i].lifeleft() * particles[j].lifeleft());
                line(particles[i].pos.x, particles[i].pos.y + deltaY,
                    particles[j].pos.x, particles[j].pos.y + deltaY);
            }
        }

        let distance = dist(mouseX, mouseY, particles[i].pos.x, particles[i].pos.y + deltaY);
        if (distance < 2*thresholdDist) {
            stroke(255, map(distance, 0, 2 * thresholdDist, 255, 32) * particles[i].lifeleft());
            line(particles[i].pos.x, particles[i].pos.y + deltaY, mouseX, mouseY);
        }

        particles[i].run();

        // check for new particles, first few are permanent
        if (particles[i].lifetime !== undefined) {
            if (particles[i].lifetime < 0) {
                particles.splice(i, 1);
            }
        }
    }

    // debug info about the current number of particles
    // noStroke();
    // fill(0);
    // rect(0, 0, 36, 32);
    // fill(255);
    // text(particles.length, 8, 24);
}

function windowResized() {
    let content_wrapper = document.getElementsByClassName('content-wrapper')[0];
    let rect = content_wrapper.getBoundingClientRect();
    let x = rect.left, y = rect.top, w = (rect.right - rect.left), h = (rect.bottom - rect.top)

    resizeCanvas(w, h);
    canvas.position(x, y);

    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function addASplash() {
    for (let i = 0; i < 8; i++) {
        let p = new Particle();
        p.pos = createVector(mouseX, mouseY - deltaY);
        p.lifetime = 1;
        particles.push(p);
    }
}

function onScroll(event) {
    deltaY = -event.target.scrollTop;
}

function toggleCanvasRendering() {
    if (looping) {
        noLoop();
    }
    else {
        loop();
    }

    looping ^= true;
}