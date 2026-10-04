document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SIMULACIÓN DE CARGA RETRO 80s ---
  const introScreen = document.getElementById("intro-screen");
  const bloodTrail = document.getElementById("blood-trail");
  const knifeLoader = document.getElementById("knife-loader");
  const loadPercentage = document.getElementById("load-percentage");

  let progress = 0;

  const simulateRetroLoading = () => {
    if (progress < 100) {
      // Salto irregular de porcentaje (efecto lag 80s)
      const increment = Math.floor(Math.random() * 12) + 1;
      progress = Math.min(progress + increment, 100);

      bloodTrail.style.width = `${progress}%`;
      knifeLoader.style.left = `${progress}%`;
      loadPercentage.textContent = progress;

      // Pausa aleatoria entre saltos
      const delay = Math.floor(Math.random() * 370) + 80;
      setTimeout(simulateRetroLoading, delay);
    } else {
      setTimeout(() => {
        introScreen.classList.add("fade-out");
      }, 500);
    }
  };

  simulateRetroLoading();

  // --- 2. GENERADOR DE GALERÍA FLOTANTE DE FONDO ---
  // Añade aquí los nombres de tus imágenes cuando las subas a la raíz del proyecto
  const imagenesObras = [
    "obra1.jpg",
    "obra2.jpg",
    "obra3.jpg"
  ];

  const galleryContainer = document.getElementById("floating-gallery");

  if (galleryContainer && imagenesObras.length > 0) {
    imagenesObras.forEach((imgSrc, index) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.classList.add("floating-item");

      // Posiciones y tiempos aleatorios para efecto orgánico
      const topPos = Math.floor(Math.random() * 70) + 10;
      const leftPos = Math.floor(Math.random() * 70) + 10;
      const duration = Math.floor(Math.random() * 6) + 8;
      const delay = index * 2.5;

      img.style.top = `${topPos}%`;
      img.style.left = `${leftPos}%`;
      img.style.animationDuration = `${duration}s`;
      img.style.animationDelay = `${delay}s`;

      galleryContainer.appendChild(img);
    });
  }
});
