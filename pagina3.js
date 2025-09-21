const starsCanvas = document.getElementById('stars');
const ctx = starsCanvas.getContext('2d');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const flowers = document.getElementById('flowers');
const loveText = document.getElementById('loveText');
const bgMusic = document.getElementById('bgMusic');

/* Ajustar canvas al ancho/alto exacto */
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
  const starCount = window.innerWidth < 600 ? 120 : 220;
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.3 + 0.3,
      a: Math.random() * 0.8 + 0.2,
      v: Math.random() * 0.01 + 0.003
    });
  }
}
let shooting = [];
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
  shooting.forEach((st, i) => {
    ctx.save();
    ctx.translate(st.x, st.y);
    ctx.rotate(st.angle);
    const grad = ctx.createLinearGradient(0, 0, -st.len, 0);
    grad.addColorStop(0, "rgba(255,255,255,0.8)");
    grad.addColorStop(1, "transparent");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-st.len, 0);
    ctx.stroke();
    ctx.restore();
    st.x += st.speed * Math.cos(st.angle);
    st.y += st.speed * Math.sin(st.angle);
    if (st.x > starsCanvas.width + 100 || st.y > starsCanvas.height + 100 || st.x < -100 || st.y < -100)
      shooting.splice(i, 1);
  });
  if (Math.random() < 0.003) {
    shooting.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height / 3,
      len: 80 + Math.random() * 40,
      speed: 8 + Math.random() * 4,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5
    });
  }
  requestAnimationFrame(drawStars);
}

/* Crear flor desde la parte inferior */
function createSunflower(x, baseHeight, size) {
  const f = document.createElement('div');
  f.className = 'flower';
  // X horizontal aleatoria, Y calculada para que el tallo empiece en bottom
  f.style.left = `${x}px`;
  f.style.bottom = '0px';
  f.style.setProperty('--size', size + 'px');
  f.style.setProperty('--height', baseHeight + 'px');
  flowers.appendChild(f);

  const stem = document.createElement('div');
  stem.className = 'stem';
  f.appendChild(stem);

  const leaf1 = document.createElement('div');
  leaf1.className = 'leaf left';
  f.appendChild(leaf1);

  const leaf2 = document.createElement('div');
  leaf2.className = 'leaf right';
  f.appendChild(leaf2);

  const c = document.createElement('div');
  c.className = 'center';
  f.appendChild(c);

  const petalsCount = 20;
  for (let i = 0; i < petalsCount; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const angle = i * (360 / petalsCount);
    const variationRot = (Math.random() - 0.5) * 6;
    p.style.transform = `translate(-50%, -50%) rotate(${angle + variationRot}deg) scaleY(0)`;
    f.appendChild(p);
  }

  const delay = Math.random() * 500;
  setTimeout(() => {
    f.style.opacity = '1';
    c.style.transform = 'translate(-50%, -50%) scale(1)';
    f.querySelectorAll('.petal').forEach((p, idx) => {
      setTimeout(() => {
        p.style.transform = p.style.transform.replace('scaleY(0)', 'scaleY(1)');
      }, idx * 15);
    });

    let a = Math.random() * Math.PI * 2;
    const animate = () => {
      a += 0.004;
      const swing = Math.sin(a) * 3;
      f.style.transform = `translate3d(0,0,0) rotate(${swing}deg)`;
      leaf1.style.transform = `rotate(${-15 + Math.sin(a * 1.5) * 5}deg)`;
      leaf2.style.transform = `rotate(${15 + Math.cos(a * 1.5) * 5}deg) scaleX(-1)`;
      requestAnimationFrame(animate);
    };
    animate();
  }, delay);
}

/* Flores que llenan hasta la mitad de la pantalla con distintos tamaños */
function placeFlowers() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const count = w < 600 ? 15 : 30;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * w * 0.9;
    const baseHeight = h * 0.4 + Math.random() * h * 0.15; // altura 40-55% de pantalla
    const s = 40 + Math.random() * (w < 600 ? 50 : 80);
    createSunflower(x, baseHeight, s);
  }
}

startBtn.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => overlay.style.display = 'none', 1000);
  bgMusic.volume = 0.6;
  bgMusic.play().catch(() => {});
  initStars();
  drawStars();
  loveText.style.opacity = 1;
  placeFlowers();
});
