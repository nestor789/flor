const starsCanvas = document.getElementById('stars');
const ctx = starsCanvas.getContext('2d');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const flowers = document.getElementById('flowers');
const loveText = document.getElementById('loveText');
const bgMusic = document.getElementById('bgMusic');

/* Ajustar canvas */
function resize() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* Cielo estrellado */
let stars = [];
function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.8 + 0.2,
      v: Math.random() * 0.015 + 0.005
    });
  }
}
function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(s => {
    ctx.globalAlpha = s.a;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.a += s.v;
    if (s.a <= 0.2 || s.a >= 1) s.v *= -1;
  });
  requestAnimationFrame(drawStars);
}

/* Animación del único girasol */
function growSunflower() {
  const f = document.createElement('div');
  f.className = 'flower';
  flowers.appendChild(f);

  // Tallo
  const stem = document.createElement('div');
  stem.className = 'stem';
  f.appendChild(stem);

  // Hojas
  const leaf1 = document.createElement('div');
  leaf1.className = 'leaf left';
  f.appendChild(leaf1);

  const leaf2 = document.createElement('div');
  leaf2.className = 'leaf right';
  f.appendChild(leaf2);

  // Centro
  const center = document.createElement('div');
  center.className = 'center';
  f.appendChild(center);

  // Pétalos
  const petalsCount = 24;
  for (let i = 0; i < petalsCount; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const angle = i * (360 / petalsCount);
    p.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleY(0)`;
    f.appendChild(p);
  }

  // Etapas de animación
  // 1️⃣ Crecer tallo
  setTimeout(() => {
    stem.classList.add('grow');
  }, 500);

  // 2️⃣ Mostrar hojas al final del crecimiento
  setTimeout(() => {
    leaf1.classList.add('show');
    leaf2.classList.add('show');
  }, 4000);

  // 3️⃣ Aparece centro
  setTimeout(() => {
    center.classList.add('show');
  }, 5000);

  // 4️⃣ Desplegar pétalos uno por uno
  setTimeout(() => {
    const petals = f.querySelectorAll('.petal');
    petals.forEach((p, idx) => {
      setTimeout(() => {
        p.style.transform = p.style.transform.replace('scaleY(0)', 'scaleY(1)');
      }, idx * 80);
    });
  }, 6000);
}

startBtn.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);

  bgMusic.volume = 0.7;
  bgMusic.play().catch(() => console.log('Autoplay bloqueado'));

  initStars();
  drawStars();

  loveText.style.opacity = 1;

  // 🌻 Crear un único girasol
  growSunflower();
});
