window.onload = () => {
  const startBtn = document.getElementById("start-btn");
  const song = document.getElementById("song");
  const scene = document.getElementById("scene");
  const startContainer = document.getElementById("start-container");
  const video = document.getElementById("flower-video");

  startBtn.addEventListener("click", () => {
    startContainer.style.display = "none";  // Oculta el botón
    scene.classList.remove("hidden");       // Muestra escena

    song.play();                            // Reproduce música
    video.currentTime = 0;                  // Reinicia video
    video.play();                           // Reproduce video

    initStars();                            // Fondo estrellado
  });

  // Estrellas y fugaces
  function initStars() {
    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function updateStars() {
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    }

    function shootingStar() {
      let x = Math.random() * canvas.width;
      let y = Math.random() * (canvas.height / 2);
      let length = Math.random() * 80 + 50;
      let speed = 8;

      function animate() {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - length, y + length);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        x -= speed;
        y += speed;
      }
      animate();
    }

    setInterval(() => {
      drawStars();
      updateStars();
      if (Math.random() < 0.01) shootingStar();
    }, 30);
  }
};
