document.addEventListener("DOMContentLoaded", () => {
  const emojis = ['😀','😃','😄','😁','😆','😊','😎','🤩','🥳','😺','😸'];
  const total = 25; // número de caritas en pantalla

  for (let i = 0; i < total; i++) {
    const span = document.createElement('span');
    span.classList.add('emoji');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + 'vw';          // posición horizontal aleatoria
    span.style.animationDuration = (4 + Math.random() * 4) + 's'; // velocidad distinta
    document.body.appendChild(span);
  }
});
