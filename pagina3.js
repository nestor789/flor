const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const flowersContainer = document.getElementById('flowersContainer');
const pot = document.querySelector('.pot');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const music = document.getElementById('backgroundMusic');
const loveMessage = document.getElementById('loveMessage');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

// === Estrellas y fugaces ===
let stars = [];
let shootingStars = [];

function createStars() {
    stars = [];
    shootingStars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height / 2,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.02
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

    // Fondo de estrellas
    stars.forEach(s => {
        ctx.beginPath();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = "white";
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        s.alpha += s.twinkleSpeed;
        if (s.alpha <= 0 || s.alpha >= 1) s.twinkleSpeed *= -1;
    });

    // Estrellas fugaces
    shootingStars.forEach((star, i) => {
        star.x += star.vx;
        star.y += star.vy;
        star.alpha -= 0.01;
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = 'white';
        ctx.fillRect(star.x, star.y, 2, 2);
        if (star.alpha <= 0) shootingStars.splice(i, 1);
    });

    requestAnimationFrame(drawStars);
}

function spawnShootingStar() {
    shootingStars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height / 2,
        vx: Math.random() * 8 + 4,
        vy: Math.random() * 2 + 1,
        alpha: 1
    });
    setTimeout(spawnShootingStar, Math.random() * 3000 + 2000);
}

// === Ramo de flores ===
const flowerCount = 4;

function createFlower(index) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flowersContainer.appendChild(flower);

    const offsetX = (Math.random() - 0.5) * 60; 
    flower.style.left = `calc(50% + ${offsetX}px)`;
    flower.style.bottom = `100px`;

    // Tallo
    const stem = document.createElement('div');
    stem.classList.add('stem');
    stem.style.height = '0px';
    flower.appendChild(stem);

    // Flor (head)
    const head = document.createElement('div');
    head.classList.add('flower-head', 'glow');
    head.style.position = 'absolute';
    head.style.left = '50%';
    head.style.bottom = '0px';
    head.style.transform = 'translateX(-50%) scale(0)';
    flower.appendChild(head);

    const center = document.createElement('div');
    center.classList.add('center');
    head.appendChild(center);

    const petals = [];
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.transform = `rotate(${i * 30}deg) translateY(-25px)`;
        head.appendChild(petal);
        petals.push(petal);
    }

    // Animación crecimiento del tallo
    const maxHeight = 180 + Math.random() * 40;
    let currentHeight = 0;

    const growInterval = setInterval(() => {
        if (currentHeight >= maxHeight) {
            clearInterval(growInterval);
            // Flor germina lentamente
            let scale = 0;
            const flowerGrow = setInterval(() => {
                if (scale >= 1) clearInterval(flowerGrow);
                scale += 0.02;
                head.style.transform = `translateX(-50%) scale(${scale})`;
            }, 30);
        } else {
            currentHeight += 2;
            stem.style.height = currentHeight + 'px';
            head.style.bottom = currentHeight + 'px';
        }
    }, 30);

    // Animación viento
    let windAngle = Math.random() * Math.PI * 2;
    setInterval(() => {
        windAngle += 0.01;
        const sway = Math.sin(windAngle) * 2;
        stem.style.transform = `rotate(${sway}deg)`;
        head.style.transform = `translateX(-50%) scale(1) rotate(${sway*0.5}deg)`;
        petals.forEach((petal, i) => {
            const petalSway = Math.sin(windAngle + i) * 3;
            petal.style.transform = `rotate(${i*30 + petalSway}deg) translateY(-25px)`;
        });
    }, 50);
}

// === Botón iniciar ===
startButton.addEventListener('click', () => {
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.display = 'none';
        pot.style.display = 'block';
    }, 500);

    music.play().catch(e => console.log("Autoplay prevenido:", e));

    createStars();
    drawStars();
    spawnShootingStar();

    loveMessage.style.opacity = 1;

    for (let i = 0; i < flowerCount; i++) {
        setTimeout(() => createFlower(i), i * 500);
    }
});

window.addEventListener('resize', () => {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    createStars();
});

document.addEventListener('click', () => {
    if (music.paused) music.play().catch(e => console.log("Error al reproducir audio:", e));
}, { once: true });
