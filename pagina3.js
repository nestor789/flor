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

class Star {
    constructor() {
        this.x = Math.random() * starsCanvas.width;
        this.y = Math.random() * starsCanvas.height;
        this.radius = Math.random() * 2;
        this.speed = Math.random() * 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) this.y = starsCanvas.height;
        this.draw();
    }
}

class ShootingStar {
    constructor() {
        this.x = Math.random() * starsCanvas.width;
        this.y = 0;
        this.length = Math.random() * 80 + 50;
        this.speed = Math.random() * 10 + 6;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y + this.length);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
        if (this.x > starsCanvas.width || this.y > starsCanvas.height) {
            this.x = Math.random() * starsCanvas.width;
            this.y = 0;
        }
        this.draw();
    }
}

function createStars() {
    for (let i = 0; i < 100; i++) stars.push(new Star());
}

function createShootingStars() {
    for (let i = 0; i < 5; i++) shootingStars.push(new ShootingStar());
}

function animate() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    stars.forEach(star => star.update());
    shootingStars.forEach(shootingStar => shootingStar.update());
    requestAnimationFrame(animate);
}

function createFlowers() {
    for (let i = 0; i < 10; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.style.animationDelay = `${Math.random()*2}s`;
        flowersContainer.appendChild(flower);
    }
}

startButton.addEventListener('click', () => {
    overlay.style.opacity = 0;
    setTimeout(() => overlay.style.display = 'none', 2000);
    music.play();
    createStars();
    createShootingStars();
    animate();
    createFlowers();
    setTimeout(() => loveMessage.style.opacity = 1, 2000);
});
