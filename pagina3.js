document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("iniciarBtn");
  const titulo = document.querySelector(".titulo");
  const video = document.getElementById("floresVideo");
  const audio = document.getElementById("floresAudio");
  const lluvia = document.getElementById("lluviaFlores");

  // Evento botón iniciar
  btn.addEventListener("click", () => {
    btn.style.display = "none"; // Ocultar botón
    video.classList.remove("oculto");
    titulo.classList.remove("oculto");
    video.play();
    audio.play();

    iniciarLluviaFlores();
  });

  // 🌌 Estrellas fugaces en canvas
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let estrellas = [];
  for (let i = 0; i < 150; i++) {
    estrellas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5,
      d: Math.random() * 0.5
    });
  }

  function dibujarEstrellas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    estrellas.forEach(e => {
      ctx.moveTo(e.x, e.y);
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    });
    ctx.fill();
  }

  function moverEstrellas() {
    estrellas.forEach(e => {
      e.y += e.d;
      if (e.y > canvas.height) {
        e.y = 0;
        e.x = Math.random() * canvas.width;
      }
    });
  }

  function animarEstrellas() {
    dibujarEstrellas();
    moverEstrellas();
    requestAnimationFrame(animarEstrellas);
  }

  animarEstrellas();

  // ✨ Lluvia de flores
  function iniciarLluviaFlores() {
    setInterval(() => {
      const flor = document.createElement("div");
      flor.classList.add("flor");
      flor.textContent = "🌼"; // emoji de flor amarilla
      flor.style.left = Math.random() * 100 + "vw";
      flor.style.fontSize = Math.random() * 20 + 20 + "px";
      flor.style.animationDuration = (Math.random() * 3 + 3) + "s";
      lluvia.appendChild(flor);

      setTimeout(() => {
        flor.remove();
      }, 6000);
    }, 400);
  }
});
