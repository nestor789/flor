const starsCanvas = document.getElementById('stars');
const ctx = starsCanvas.getContext('2d');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const flowers = document.getElementById('flowers');
const loveText = document.getElementById('loveText');
const bgMusic = document.getElementById('bgMusic');

function resize() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* Fondo de estrellas */
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

/* Crear girasol */
function growSunflower() {
  const flower = document.createElement('div');
  flower.className = 'flower';
  flowers.appendChild(flower);

  // Tallo
  const stem = document.createElement('div');
  stem.className = 'stem';
  flower.appendChild(stem);

  // Hojas
  const leaf1 = document.createElement('div');
  leaf1.className = 'leaf left';
  flower.appendChild(leaf1);

  const leaf2 = document.createElement('div');
  leaf2.className = 'leaf right';
  flower.appendChild(leaf2);

  // Cabeza (contenedor centro + pétalos)
  const head = document.createElement('div');
  head.className = 'head';
  flower.appendChild(head);

  // Centro marrón
  const center = document.createElement('div');
  center.className = 'center';
  head.appendChild(center);

  // Pétalos alrededor del centro
  const petalsCount = 24;
  for (let i = 0; i < petalsCount; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.transform = `rotate(${i * (360 / petalsCount)}deg) scaleY(0)`;
    head.appendChild(p);
  }

  // Animación en etapas
  setTimeout(() => stem.classList.add('grow'), 500);        // crecer tallo
  setTimeout(() => { leaf1.classList.add('show'); leaf2.classList.add('show'); }, 4000);
  setTimeout(() => center.classList.add('show'), 5000);     // mostrar centro
  setTimeout(() => {
    const petals = head.querySelectorAll('.petal');
    petals.forEach((p, i) =>
      setTimeout(() => p.style.transform =
        p.style.transform.replace('scaleY(0)', 'scaleY(1)'), i * 80)
    );
  }, 6000);
}

startBtn.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => overlay.style.display = 'none', 1000);
  bgMusic.volume = 0.7;
  bgMusic.play().catch(() => {});
  initStars();
  drawStars();
  loveText.style.opacity = 1;
  growSunflower();
});
