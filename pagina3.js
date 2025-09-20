// Seleccionamos los elementos principales
const startBtn    = document.getElementById('startBtn');
const startScreen = document.getElementById('start-screen');
const music       = document.getElementById('music');
const loveTitle   = document.getElementById('love-title');

startBtn.addEventListener('click', () => {
  // 1️⃣ Oculta la pantalla inicial
  startScreen.style.display = 'none';

  // 2️⃣ Reproduce la música
  music.play();

  // 3️⃣ Activa las animaciones CSS
  document.querySelectorAll('.flower, .flower__leafs, .flower__leaf, .flower__line, .flower__light')
          .forEach(el => {
            el.style.animationPlayState = 'running';
          });

  // 4️⃣ Muestra el título "Te amo ❤" después de 6 segundos
  setTimeout(() => {
    loveTitle.style.display = 'block';
  }, 6000);
});
