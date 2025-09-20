const floatingContainer = document.getElementById('floating');
const symbols = ['😊','😁','😃','😄']; // caritas felices

function createFloatingItem() {
  const item = document.createElement('div');
  item.classList.add('floating-item');
  item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  item.style.left = Math.random() * 100 + 'vw';
  item.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

  // Subir o bajar al azar
  const direction = Math.random() < 0.5 ? 'float-up' : 'float-down';
  item.style.animation = `${direction} ${Math.random() * 4 + 4}s linear infinite`;

  floatingContainer.appendChild(item);
  setTimeout(() => item.remove(), 8000);
}

// Inicia la animación al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  setInterval(createFloatingItem, 500);
});

// Acciones de los botones
document.getElementById('btn-si').addEventListener('click', () => {
  alert('¡Genial! 😄'); // aquí puedes poner el siguiente paso o redirección
});

document.getElementById('btn-no').addEventListener('click', () => {
  alert('¡Oh, tal vez más tarde! 🙃');
});
