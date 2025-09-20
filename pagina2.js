document.addEventListener("DOMContentLoaded", () => {
  const emojis = ['😀','😃','😄','😁','😆','😊','😎','🤩','🥳','😺','😸'];
  const total = 30; // cantidad de caritas

  for (let i = 0; i < total; i++) {
    const span = document.createElement('span');
    span.classList.add('emoji');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + 'vw';              // posición horizontal aleatoria
    const direction = Math.random() < 0.5 ? 'floatDown' : 'floatUp';
    // velocidad aleatoria entre 4 y 8 s
    span.style.animation = `${direction} ${4 + Math.random() * 4}s linear infinite`;
    document.body.appendChild(span);
  }
});
