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

// Inicia animación automáticamente
window.addEventListener('DOMContentLoaded', () => {
  setInterval(createFloatingItem, 500);
});

// Botón "Lo siento" regresa a pagina2
document.getElementById('btn-sorry').addEventListener('click', () => {
  window.location.href = 'pagina2.html';
});
