const floatingContainer = document.getElementById('floating');
const symbols = ['💔','💵'];

function createFloatingItem() {
  const item = document.createElement('div');
  item.classList.add('floating-item');
  item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  // posición horizontal aleatoria
  item.style.left = Math.random() * 100 + 'vw';
  item.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';

  // dirección aleatoria: subir o caer
  const direction = Math.random() < 0.5 ? 'float-up' : 'float-down';
  item.style.animation = `${direction} ${Math.random() * 4 + 4}s linear infinite`;

  floatingContainer.appendChild(item);
  setTimeout(() => item.remove(), 8000);
}

// 👉 Empieza automáticamente en cuanto la página cargue
window.addEventListener('DOMContentLoaded', () => {
  setInterval(createFloatingItem, 500);
});

// Acción del botón
document.getElementById('continuar').addEventListener('click', () => {
  window.location.href = 'pagina2.html'; // página de destino
});
