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

/* Cielo estrellado MEJORADO */
let stars = [];
function initStars() {
  stars = [];
  for (let i = 0; i < 300; i++) { // Más estrellas
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.8 + 0.2,
      v: Math.random() * 0.015 + 0.005
    });
  }
}
let shooting = [];
function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  
  // Estrellas titilantes
  stars.forEach(s => {
    ctx.globalAlpha = s.a;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    
    // Animación más suave
    s.a += s.v;
    if (s.a <= 0.2 || s.a >= 1) s.v *= -1;
  });
  
  // Estrellas fugaces
  shooting.forEach((st, i) => {
    ctx.save();
    ctx.translate(st.x, st.y);
    ctx.rotate(st.angle);
    const grad = ctx.createLinearGradient(0, 0, -st.len, 0);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    grad.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
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
    
    if (st.x > starsCanvas.width + 100 || st.y > starsCanvas.height + 100 || st.x < -100 || st.y < -100) {
      shooting.splice(i, 1);
    }
  });
  
  // Nueva estrella fugaz
  if (Math.random() < 0.005) { // Menos frecuentes pero más visibles
    shooting.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height / 3,
      len: 100 + Math.random() * 50,
      speed: 10 + Math.random() * 5,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5
    });
  }
  
  requestAnimationFrame(drawStars);
}

/* Crear girasol realista con animaciones FLUIDAS */
function createSunflower(x, y, size) {
  const f = document.createElement('div');
  f.className = 'flower';
  f.style.left = x + 'px';
  f.style.top = y + 'px';
  f.style.setProperty('--size', size + 'px');
  flowers.appendChild(f);

  // Tallo MUCHO MÁS LARGO
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
  const c = document.createElement('div');
  c.className = 'center';
  f.appendChild(c);

  // Pétalos con variación
  const petalsCount = 24;
  for (let i = 0; i < petalsCount; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const angle = i * (360 / petalsCount);
    // Variación aleatoria más sutil
    const variationX = (Math.random() - 0.5) * 3;
    const variationY = (Math.random() - 0.5) * 3;
    const variationRot = (Math.random() - 0.5) * 8;
    
    p.style.transform = `translate(calc(-50% + ${variationX}%), calc(-50% + ${variationY}%)) rotate(${angle + variationRot}deg) scaleY(0)`;
    f.appendChild(p);
  }

  // Animación FLUIDA
  const delay = Math.random() * 800;
  setTimeout(() => {
    f.style.opacity = '1';
    
    // Animación del centro
    c.style.transform = 'translate(-50%, -50%) scale(1)';
    
    // Animación de pétalos MÁS FLUIDA
    const petals = f.querySelectorAll('.petal');
    petals.forEach((p, idx) => {
      setTimeout(() => {
        const currentTransform = p.style.transform;
        p.style.transform = currentTransform.replace('scaleY(0)', 'scaleY(1)');
      }, idx * 20); // Animación mucho más rápida y fluida
    });
    
    // Balanceo suave con movimiento de hojas
    let a = Math.random() * Math.PI * 2;
    let swingDirection = Math.random() > 0.5 ? 1 : -1;
    
    const animateFlower = () => {
      a += 0.005;
      const swing = Math.sin(a) * 4 * swingDirection;
      f.style.transform = `rotate(${swing}deg)`;
      
      // Movimiento independiente de hojas
      const leafSway1 = Math.sin(a * 1.7) * 6;
      const leafSway2 = Math.cos(a * 1.5) * 5;
      
      leaf1.style.transform = `rotate(${-15 + leafSway1}deg)`;
      leaf2.style.transform = `rotate(${15 + leafSway2}deg) scaleX(-1)`;
      
      requestAnimationFrame(animateFlower);
    };
    
    animateFlower();
  }, delay);
}

/* Distribución orgánica con flores MÁS ALTAS */
function placeFlowers(count) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  for (let i = 0; i < count; i++) {
    // Distribución más amplia
    const x = Math.random() * w * 0.9 + w * 0.05;
    const y = h * 0.5 + Math.random() * h * 0.45; // Flores más altas
    const s = 50 + Math.random() * 70; // Más variación en tamaño
    createSunflower(x, y, s);
  }
}

/* Botón inicio */
startBtn.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000);

  // Reproducir música
  bgMusic.volume = 0.7;
  bgMusic.play().catch(() => console.log('Autoplay bloqueado'));

  // Iniciar animaciones
  initStars();
  drawStars();
  
  // Mostrar texto "Te Amo" con efecto
  loveText.style.opacity = 1;
  
  // Crear flores
  placeFlowers(35);
});