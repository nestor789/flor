document.getElementById("startBtn").addEventListener("click", () => {
  // Música
  const music = document.getElementById("bgMusic");
  music.volume = 0.7;
  music.play();

  // Animación del girasol
  growSunflower();

  // Mostrar mensaje
  document.querySelector(".message").style.opacity = "1";

  // Ocultar botón
  document.getElementById("startBtn").style.display = "none";
});

function growSunflower() {
  const head = document.querySelector('.head');
  const stem = document.querySelector('.stem');

  // Animar tallo
  setTimeout(() => stem.classList.add("grow"), 500);

  // Centro
  const center = document.createElement('div');
  center.className = 'center';
  head.appendChild(center);

  // Configuración de pétalos (capas)
  const layers = [
    { count: 16, radius: 110 }, // exterior
    { count: 10, radius: 80 }   // interior
  ];

  // Crear pétalos
  layers.forEach((layer, layerIndex) => {
    for (let i = 0; i < layer.count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      const angle = (i * 360) / layer.count;
      petal.style.transform = `rotate(${angle}deg) translateY(-${layer.radius}px) scale(0)`;
      head.appendChild(petal);

      // Animación de aparición
      setTimeout(() => {
        petal.style.transform = `rotate(${angle}deg) translateY(-${layer.radius}px) scale(1)`;
      }, 1500 + i * 120 + layerIndex * 400);
    }
  });

  // Animación del centro
  setTimeout(() => {
    center.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 3500);
}
