const startButton      = document.getElementById('startButton');
const overlay          = document.getElementById('overlay');
const starsCanvas      = document.getElementById('starsCanvas');
const ctx              = starsCanvas.getContext('2d');
const flowersContainer = document.getElementById('flowersContainer');
const loveMessage      = document.getElementById('loveMessage');
const backgroundMusic  = document.getElementById('backgroundMusic');

starsCanvas.width  = window.innerWidth;
starsCanvas.height = window.innerHeight;

/* ===== Estrellas y estrellas fugaces ===== */
let stars = [];
function createStars() {
  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      twinkleSpeed: Math.random() * 0.02
    });
  }
}

let shootingStars = [];
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height / 2,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 10 + 6,
    angle: Math.PI / 4
  });
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

  // Fondo de estrellas
  stars.forEach(s => {
    ctx.beginPath();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = 'white';
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
    s.alpha += s.twinkleSpeed;
    if (s.alpha <= 0 || s.alpha >= 1) s.twinkleSpeed *= -1;
  });

  // Estrellas fugaces
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  shootingStars.forEach((star, index) => {
    ctx.save();
    ctx.translate(star.x, star.y);
    ctx.rotate(star.angle);
    const grad = ctx.createLinearGradient(0, 0, -star.length, 0);
    grad.addColorStop(0, 'white');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-star.length, 0);
    ctx.stroke();
    ctx.restore();
    star.x += star.speed * Math.cos(star.angle);
    star.y += star.speed * Math.sin(star.angle);
    if (star.x > starsCanvas.width || star.y > starsCanvas.height) {
      shootingStars.splice(index, 1);
    }
  });

  if (Math.random() < 0.01) createShootingStar();

  requestAnimationFrame(drawStars);
}

/* ===== Flores ===== */
function createFlower(x, y, size) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.left = x + 'px';
  flower.style.top  = y + 'px';
  flower.style.width = size + 'px';
  flower.style.height = size + 'px';

  const head = document.createElement('div');
  head.classList.add('flower-head');
  head.style.width = size + 'px';
  head.style.height = size + 'px';

  // Pétalos
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.transform = `rotate(${i * 30}deg) translateY(-${size / 2.5}px)`;
    head.appendChild(petal);
  }

  // Centro
  const center = document.createElement('div');
  center.classList.add('center');
  head.appendChild(center);

  flower.appendChild(head);
  flowersContainer.appendChild(flower);

  // Animación de aparición
  setTimeout(() => {
    flower.style.transition = 'opacity 2s ease';
    flower.style.opacity = 1;
    head.style.transition = 'transform 2s ease';
    head.style.transform = 'scale(1)';
  }, Math.random() * 2000);

  // Balanceo suave
  let angle = Math.random() * 360;
  setInterval(() => {
    angle += 0.02;
    flower.style.transform = `rotate(${Math.sin(angle) * 5}deg)`;
  }, 30);
}

/* ===== Inicio ===== */
startButton.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => overlay.style.display = 'none', 1500);

  // Reproducir música
  backgroundMusic.volume = 0.7;
  backgroundMusic.play().catch(e => console.log('Audio bloqueado:', e));

  createStars();
  drawStars();
  loveMessage.style.opacity = 1;

  // Generar muchas flores dejando espacio en el centro
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;
  const count   = 35;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * screenW;
    const y = Math.random() * screenH;
    const size = 40 + Math.random() * 50;
    // dejar un hueco en el centro para el texto
    const dx = x - screenW / 2;
    const dy = y - screenH / 2;
    if (Math.sqrt(dx * dx + dy * dy) < 180) { i--; continue; }
    createFlower(x, y, size);
  }
});

window.addEventListener('resize', () => {
  starsCanvas.width  = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  stars = [];
  createStars();
});
