// Seleccionamos los elementos del DOM
const startBtn    = document.getElementById('startBtn');
const startScreen = document.getElementById('start-screen');
const music       = document.getElementById('music');
const loveTitle   = document.getElementById('love-title');

// Al hacer clic en el botón de inicio
startBtn.addEventListener('click', () => {
  // Ocultar la pantalla inicial para revelar el escenario de las flores
  startScreen.style.display = 'none';

  // Reproducir la canción
  music.play();

  // Activar todas las animaciones que están pausadas en el CSS
  document.querySelectorAll('.container *').forEach(el => {
    el.style.animationPlayState = 'running';
    el.style.WebkitAnimationPlayState = 'running';
  });

  // Mostrar el texto “Te amo ❤” tras unos segundos
  // (ajusta el tiempo si tus animaciones duran más o menos)
  setTimeout(() => {
    loveTitle.style.display = 'block';
  }, 6000);
});
