document.addEventListener("DOMContentLoaded", () => {
  const startBtn   = document.getElementById("startBtn");
  const music      = document.getElementById("music");
  const garden     = document.getElementById("garden");
  const loveTitle  = document.getElementById("love-title");

  startBtn.addEventListener("click", () => {
    // Fondo pasa de negro a amarillo lentamente
    document.body.style.background = "yellow";
    document.querySelector(".start-screen").style.display = "none";

    // Música
    music.play().catch(err => console.log(err));

    // Generar varias flores en posiciones aleatorias
    generateFlowers(15);

    // Mostrar el título después de un tiempo
    setTimeout(() => loveTitle.style.opacity = 1, 10000);
  });

  function generateFlowers(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => createFlower(), i * 600);
    }
  }

  function createFlower() {
    const flower = document.createElement("div");
    flower.className = "flower";

    // Posición aleatoria en el ancho de la pantalla
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight - 120 - Math.random() * 200;
    flower.style.left = `${x}px`;
    flower.style.top  = `${y}px`;

    // Tallo
    const stem = document.createElement("div");
    stem.className = "stem";
    flower.appendChild(stem);

    // Centro
    const center = document.createElement("div");
    center.className = "center";
    flower.appendChild(center);

    // 6 pétalos rotados
    for (let i = 0; i < 6; i++) {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.transform = `rotate(${i * 60}deg) translateY(-20px)`;
      flower.appendChild(petal);
    }

    garden.appendChild(flower);
  }
});
