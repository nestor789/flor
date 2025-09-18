const floatingContainer = document.getElementById('floating');
const symbols = ['💔','💵'];

function createFloatingItem() {
  const item = document.createElement('div');
  item.classList.add('floating-item');
  item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  item.style.left = Math.random() * 100 + 'vw';
  item.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

  // Animación al azar: subir o bajar
  const direction = Math.random() < 0.5 ? 'float-up' : 'float-down';
  item.style.animationName = direction;
  item.style.animationDuration = (Math.random() * 4 + 4) + 's';

  floatingContainer.appendChild(item);
  setTimeout(() => item.remove(), 8000);
}

setInterval(createFloatingItem, 500);

// Acción del botón
document.getElementById('continuar').addEventListener('click', () => {
  window.location.href = 'pagina2.html'; // o la siguiente página
});
