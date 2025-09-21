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
let shootingStars = [];

function createStars() {
  stars = [];
  shootingStars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.02
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

  stars.forEach(s => {
    ctx.beginPath();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = "white";
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.alpha += s.speed;
    if (s.alpha <= 0 || s.alpha >= 1) s.speed *= -1;
  });

  shootingStars.forEach((star, i) => {
    star.x += star.vx;
    star.y += star.vy;
    star.alpha -= 0.01;
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = "white";
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
  setTimeout(spawnShootingStar, Math.random() * 4000 + 2000);
}

// === Flores ===
const flowerCount = 4;

function createFlower(index) {
  const flower = document.createElement('div');
  flower.classList.add('flower');
  flowersContainer.appendChild(flower);

  const totalWidth = 400;
  const flowerX = (index / (flowerCount - 1) - 0.5) * totalWidth;
  flower.style.left = `calc(50% + ${flowerX}px)`;
  flower.style.bottom = '100px';
  flower.style.position = 'absolute';

  // Tallo
  const stem = document.createElement('div');
  stem.classList.add('stem');
  stem.style.height = '0px';
  stem.style.position = 'absolute';
  stem.style.bottom = '0px';
  flower.appendChild(stem);

  // Cabeza (oculta hasta que crezca el tallo)
  const head = document.createElement('div');
  head.classList.add('flower-head');
  head.style.transform = 'translateX(-50%) scale(0)';
  head.style.transformOrigin = 'bottom center';
  head.style.position = 'absolute';
  head.style.left = '50%';
  head.style.bottom = '0px';
  flower.appendChild(head);

  // Centro proporcional
  const center = document.createElement('div');
  center.classList.add('center');
  center.style.width = '50px';
  center.style.height = '50px';
  head.appendChild(center);

  const petals = [];
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.transform = `rotate(${i * 30}deg) translateY(-40px)`;
    head.appendChild(petal);
    petals.push(petal);
  }

  // Hojas en el tallo
  const leaves = [];
  const leafCount = 3;
  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    leaf.style.opacity = 0;
    flower.appendChild(leaf);
    leaves.push(leaf);
  }

  // Crecimiento del tallo
  const maxHeight = 160 + Math.random() * 80;
  let currentHeight = 0;
  const growInterval = setInterval(() => {
    if (currentHeight >= maxHeight) {
      clearInterval(growInterval);

      // Animación de apertura suave
      let scale = 0;
      const bloom = setInterval(() => {
        if (scale >= 1) {
          clearInterval(bloom);

          // Balanceo con viento una vez abierta
          let angle = 0;
          setInterval(() => {
            angle += 0.02;
            const sway = Math.sin(angle) * 3;
            stem.style.transform = `rotate(${sway}deg)`;
            head.style.transform = `translateX(-50%) scale(1) rotate(${sway}deg)`;
          }, 50);
        }
        scale += 0.02;
        head.style.transform = `translateX(-50%) scale(${scale})`;
      }, 40);

    } else {
      currentHeight += 2;
      stem.style.height = currentHeight + 'px';
      head.style.bottom = currentHeight + 'px';

      // Hojas aparecen progresivamente
      leaves.forEach((leaf, i) => {
        if (currentHeight > maxHeight * (0.3 + i * 0.2)) {
          leaf.style.opacity = 1;
          leaf.style.bottom = (currentHeight * (0.3 + i * 0.2)) + 'px';
          leaf.style.left = i % 2 === 0 ? '-20px' : '';
          leaf.style.right = i % 2 !== 0 ? '-20px' : '';
        }
      });
    }
  }, 30);
}

// === Iniciar ===
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
    setTimeout(() => createFlower(i), i * 600);
  }
});

window.addEventListener('resize', () => {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  createStars();
});

document.addEventListener('click', () => {
  if (music.paused) music.play().catch(e => console.log("Error audio:", e));
}, { once: true });
