const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const flowersContainer = document.getElementById('flowersContainer');
const loveMessage = document.getElementById('loveMessage');
const music = document.getElementById('backgroundMusic');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

/* === Estrellas y estrellas fugaces === */
let stars = [];
function createStars() {
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

let shootingStars = [];
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * starsCanvas.width,
    y: Math.random() * starsCanvas.height/2,
    length: Math.random() * 80 + 40,
    speed: Math.random() * 6 + 4,
    opacity: 1
  });
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

  // normal stars
  stars.forEach(s => {
    ctx.beginPath();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = "white";
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fill();
    s.alpha += s.twinkleSpeed;
    if (s.alpha <= 0 || s.alpha >= 1) s.twinkleSpeed *= -1;
  });

  // shooting stars
  shootingStars.forEach((s, i) => {
    ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.stroke();
    s.x += s.speed;
    s.y -= s.speed;
    s.opacity -= 0.01;
    if (s.opacity <= 0) shootingStars.splice(i, 1);
  });

  requestAnimationFrame(drawStars);
}

/* === Flores === */
const flowerCount = 4;

function createFlower(index) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flower.style.left = `${(index - (flowerCount - 1) / 2) * 180}px`;
  flowersContainer.appendChild(flower);

  const stem = document.createElement('div');
  stem.classList.add('stem');
  flower.appendChild(stem);

  // hojas
  const leafTotal = 3;
  const leaves = [];
  for (let i = 0; i < leafTotal; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    flower.appendChild(leaf);
    leaves.push(leaf);
  }

  const head = document.createElement('div');
  head.classList.add('flower-head');
  flower.appendChild(head);

  const center = document.createElement('div');
  center.classList.add('center');
  head.appendChild(center);

  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.transform = `rotate(${i * 30}deg) translateY(-22px)`;
    head.appendChild(petal);
  }

  // Crecimiento
  const stemHeight = 180 + Math.random() * 60;
  let currentHeight = 0;

  const growInterval = setInterval(() => {
    if (currentHeight >= stemHeight) {
      clearInterval(growInterval);

      // Flor se abre lentamente
      let scale = 0;
      const bloom = setInterval(() => {
        scale += 0.02;
        head.style.transform = `translateX(-50%) scale(${scale})`;
        if (scale >= 1) {
          clearInterval(bloom);
          swayAnimation();
        }
      }, 40);
    } else {
      currentHeight += 2;
      stem.style.height = currentHeight + 'px';
      head.style.bottom = currentHeight + 'px';

      // hojas aparecen progresivamente
      leaves.forEach((leaf, i) => {
        const triggerHeight = stemHeight * ((i + 1) / (leafTotal + 1));
        if (currentHeight > triggerHeight && !leaf.style.opacity) {
          leaf.style.opacity = 1;
          leaf.style.bottom = triggerHeight + 'px';
          leaf.style.left = i % 2 === 0 ? '-25px' : '5px';
          leaf.style.transform = i % 2 === 0
            ? 'rotate(-20deg)'
            : 'rotate(20deg)';
        }
      });
    }
  }, 30);

  // movimiento suave de viento
  function swayAnimation() {
    let angle = 0;
    setInterval(() => {
      angle += 0.01;
      const sway = Math.sin(angle) * 3;
      stem.style.transform = `translateX(-50%) rotate(${sway}deg)`;
      head.style.transform = `translateX(-50%) scale(1) rotate(${sway * 0.5}deg)`;
    }, 30);
  }
}

startButton.addEventListener('click', () => {
  overlay.style.opacity = 0;
  setTimeout(() => overlay.style.display = 'none', 2000);

  music.play().catch(e => console.log("Autoplay bloqueado:", e));

  createStars();
  drawStars();
  setInterval(createShootingStar, 4000);

  loveMessage.style.opacity = 1;

  // Crear flores
  for (let i = 0; i < flowerCount; i++) {
    setTimeout(() => createFlower(i), i * 500);
  }

  // Líneas de viento visibles
  for (let i = 0; i < 8; i++) {
    const line = document.createElement('div');
    line.classList.add('wind-line');
    line.style.top = `${Math.random() * window.innerHeight}px`;
    line.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(line);
  }
});

window.addEventListener('resize', () => {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  stars = [];
  createStars();
});
