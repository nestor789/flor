document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("iniciarBtn");
  const titulo = document.querySelector(".titulo");
  const video = document.getElementById("floresVideo");
  const audio = document.getElementById("floresAudio");

  btn.addEventListener("click", () => {
    // Ocultar botón
    btn.style.display = "none";

    // Mostrar y reproducir video
    video.classList.remove("oculto");
    video.play();

    // Mostrar título
    titulo.classList.remove("oculto");

    // Reproducir canción
    audio.play();
  });
});
