document.addEventListener("DOMContentLoaded", () => {
  const emojis = ['😀','😃','😄','😁','😆','😊','😎','🤩','🥳','😺','😸'];
  const total = 30; // cantidad de caritas

  for (let i = 0; i < total; i++) {
    const span = document.createElement('span');
    span.classList.add('emoji');
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + 'vw';   // posición horizontal aleatoria

    if (Math.random() < 0.5) {
      // Cae desde arriba: colócala por encima del viewport
      span.style.top = '-50px';
      span.style.animation = `fall ${4 + Math.random() * 4}s linear infinite`;
    } else {
      // Sube desde abajo: colócala por debajo del viewport
      span.style.bottom = '-50px';
      span.style.animation = `rise ${4 + Math.random() * 4}s linear infinite`;
    }

    document.body.appendChild(span);
  }
});
