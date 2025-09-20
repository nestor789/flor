const floatingContainer = document.getElementById('floating');
const angryFaces = ['😡','😠','🤬']; // caritas enojadas

function createFloatingItem() {
  const item = document.createElement('div');
  item.classList.add('floating-item');
  item.textContent = angryFaces[Math.floor(Math.random() * angryFaces.length)];

  item.style.left = Math.random() * 100 + 'vw';
  item.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

  const direction = Math.random() < 0.5 ? 'float-up' : 'float-down';
  item.style.animation = `${direction} ${Math.random() * 4 + 4}s linear infinite`;

  floatingContainer.appendChild(item);
  setTimeout(() => item.remove(), 8000);
}

// Animación automática
window.addEventListener('DOMContentLoaded', () => {
  setInterval(createFloatingItem, 500);
});

// Reproducir sonido al primer toque/clic
window.addEventListener('click', () => {
  const sound = document.getElementById('angry-sound');
  sound.muted = false;   // desmutea
}, { once: true });

// Botón para volver a pagina2.html
document.getElementById('btn-sorry').addEventListener('click', () => {
  window.location.href = 'pagina2.html';
});
