// === Selección de elementos ===
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

// === Estrellas ===
let stars = [];
function createStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.02
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    stars.forEach(s => {
        ctx.beginPath();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = "white";
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        s.alpha += s.twinkleSpeed;
        if (s.alpha <= 0 || s.alpha >= 1) s.twinkleSpeed *= -1;
    });
    requestAnimationFrame(drawStars);
}

// === Ramo de flores ===
const flowerCount = 9;

function createFlower(index) {
    console.log("Creando flor", index);

    const flower = document.createElement('div');
    flower.classList.add('flower');
    flowersContainer.appendChild(flower);

    // Posición estilo ramo
    const offsetX = (Math.random() - 0.5) * 100;
    const offsetY = Math.random() * 30;
    flower.style.left = `calc(50% + ${offsetX}px)`;
    flower.style.bottom = `${100 + offsetY}px`;

    // Tallo
    const stem = document.createElement('div');
    stem.classList.add('stem');
    flower.appendChild(stem);

    // Hojas
    const leafCount = Math.floor(Math.random() * 2) + 2;
    const leaves = [];
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        flower.appendChild(leaf);
        leaves.push(leaf);
    }

    // Cabeza de la flor
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

    flower.style.opacity = 1;

    // Altura del tallo
    const baseStemHeight = 150;
    const heightVariation = 40;
    const stemHeight = baseStemHeight + (Math.random() * heightVariation - heightVariation / 2);

    // Animación crecimiento tallo
    let currentStemHeight = 0;
    const growInterval = setInterval(() => {
        if (currentStemHeight >= stemHeight) {
            clearInterval(growInterval);
            head.style.transition = 'transform 1.5s ease-out';
            head.style.transform = 'translateX(-50%) scale(1)';
        } else {
            currentStemHeight += 2;
            stem.style.height = currentStemHeight + 'px';

            // Posicionar hojas
            leaves.forEach((leaf, i) => {
                if (currentStemHeight > stemHeight * (0.2 + i * 0.2)) {
                    leaf.style.opacity = 1;
                    leaf.style.bottom = (currentStemHeight * (0.2 + i * 0.2)) + 'px';
                    leaf.style.left = i % 2 === 0 ? '-15px' : '';
                    leaf.style.right = i % 2 !== 0 ? '-15px' : '';
                }
            });

            // Flor en punta del tallo
            head.style.bottom = currentStemHeight + 'px';
        }
    }, 30);

    // Animación viento
    let windAngle = Math.random() * Math.PI * 2;
    setInterval(() => {
        windAngle += 0.02;
        const sway = Math.sin(windAngle) * (2 + Math.random() * 3);
        stem.style.transform = `rotate(${sway}deg)`;
        head.style.transform = `translateX(-50%) scale(1) rotate(${sway * 0.7}deg)`;

        petals.forEach((petal, i) => {
            const petalSway = Math.sin(windAngle + i) * 5;
            petal.style.transform = `rotate(${i * 30 + petalSway}deg) translateY(-25px)`;
        });

        leaves.forEach((leaf, i) => {
            const leafSway = Math.sin(windAngle + i) * 8;
            leaf.style.transform = `rotate(${i % 2 === 0 ? -45 + leafSway : 45 + leafSway}deg)`;
        });
    }, 30);
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

    loveMessage.style.opacity = 1;

    for (let i = 0; i < flowerCount; i++) {
        setTimeout(() => createFlower(i), i * 200);
    }
});

// === Ajuste al redimensionar ventana ===
window.addEventListener('resize', () => {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    createStars();
});

// === Reproducir música al click en cualquier parte si estaba pausada ===
document.addEventListener('click', () => {
    if (music.paused) music.play().catch(e => console.log("Error al reproducir audio:", e));
}, { once: true });
