const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const flowersContainer = document.getElementById('flowersContainer');
const loveMessage = document.getElementById('loveMessage');
const music = document.getElementById('backgroundMusic');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

/* ==== Estrellas ==== */
let stars = [];
function createStars() {
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random(),
      s: Math.random() * 0.02
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.globalAlpha = star.a;
    ctx.fillStyle = "white";
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.a += star.s;
    if (star.a <= 0 || star.a >= 1) star.s *= -1;
  });
  requestAnimationFrame(drawStars);
}

/* ==== Flores ==== */
function createFlower(x, y, size) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.left = x + 'px';
  flower.style.top = y + 'px';
  flower.style.width = size + 'px';
  flower.style.height = size + 'px';

  // centro
  const center = document.createElement('div');
  center.classList.add('center');
  flower.appendChild(center);

  // pétalos
  const petals = 12;
  for (let i = 0; i < petals; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.transform = `rotate(${i * (360/petals)}deg) translateY(-${size/2.5}px)`;
    flower.appendChild(petal);
  }

  flowersContainer.appendChild(flower);
}

/* ==== Inicio ==== */
startButton.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => overlay.style.display = 'none', 2000);

  music.play().catch(()=>{});

  createStars();
  drawStars();

  loveMessage.style.opacity = 1;

  // Generar flores en casi toda la pantalla dejando espacio central para texto
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const flowerCount = 30;
  for (let i = 0; i < flowerCount; i++) {
    const x = Math.random() * screenW;
    const y = Math.random() * screenH;
    const size = 40 + Math.random() * 40;

    // evitar demasiado cerca del centro para no tapar texto
    const dx = x - screenW/2;
    const dy = y - screenH/2;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 150) continue; // espacio para el mensaje

    createFlower(x, y, size);
  }
});

window.addEventListener('resize', () => {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  stars = [];
  createStars();
});
