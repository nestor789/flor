const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const flowersContainer = document.getElementById('flowersContainer');
const loveMessage = document.getElementById('loveMessage');
const music = document.getElementById('backgroundMusic');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

/* ======== Clases para estrellas ======== */
class Star {
    constructor() {
        this.x = Math.random() * starsCanvas.width;
        this.y = Math.random() * starsCanvas.height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random();
        this.twinkleSpeed = Math.random() * 0.02;
    }
    draw() {
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha <= 0 || this.alpha >= 1) this.twinkleSpeed *= -1;
        this.draw();
    }
}

class ShootingStar {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * starsCanvas.width;
        this.y = Math.random() * starsCanvas.height * 0.3;
        this.length = Math.random() * 80 + 50;
        this.speed = Math.random() * 10 + 6;
        this.trail = [];
    }
    draw() {
        for (let i = 0; i < this.trail.length; i++) {
            const pos = this.trail[i];
            ctx.globalAlpha = i / this.trail.length;
            ctx.fillStyle = 'white';
            ctx.fillRect(pos.x, pos.y, 2, 2);
        }
        ctx.globalAlpha = 1;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
    update() {
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 20) this.trail.shift();
        this.x += this.speed;
        this.y += this.speed;
        if (this.x > starsCanvas.width || this.y > starsCanvas.height) this.reset();
        this.draw();
    }
}

/* ======== Inicialización ======== */
function createStars() {
    for (let i = 0; i < 200; i++) stars.push(new Star());
}
function createShootingStars() {
    for (let i = 0; i < 4; i++) shootingStars.push(new ShootingStar());
}

function animate() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    stars.forEach(s => s.update());
    if (Math.random() < 0.01) shootingStars.push(new ShootingStar()); // fugaces aleatorias
    shootingStars.forEach(s => s.update());
    requestAnimationFrame(animate);
}

/* ======== Flores que florecen ======== */
function growFlowers() {
    const total = 10;
    let count = 0;
    const interval = setInterval(() => {
        if (count >= total) {
            clearInterval(interval);
            setTimeout(() => loveMessage.style.opacity = 1, 2000);
            return;
        }
        addFlower();
        count++;
    }, 700);
}

function addFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');

    // pétalos
    for (let i = 0; i < 5; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        flower.appendChild(petal);
    }

    // centro
    const center = document.createElement('div');
    center.classList.add('center');
    flower.appendChild(center);

    flowersContainer.appendChild(flower);
}

/* ======== Evento de inicio ======== */
startButton.addEventListener('click', () => {
    overlay.style.opacity = 0;
    setTimeout(() => overlay.style.display = 'none', 2000);
    music.play();

    createStars();
    createShootingStars();
    animate();
    growFlowers();
});
