document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SIMULACIÓN DE CARGA RETRO 80s ---
  const introScreen = document.getElementById("intro-screen");
  const bloodTrail = document.getElementById("blood-trail");
  const knifeLoader = document.getElementById("knife-loader");
  const loadPercentage = document.getElementById("load-percentage");

  let progress = 0;

  const simulateRetroLoading = () => {
    if (progress < 100) {
      // Avanza a tirones irregulares
      const increment = Math.floor(Math.random() * 12) + 1;
      progress = Math.min(progress + increment, 100);

      if (bloodTrail) bloodTrail.style.width = `${progress}%`;
      if (knifeLoader) knifeLoader.style.left = `${progress}%`;
      if (loadPercentage) loadPercentage.textContent = progress;

      const delay = Math.floor(Math.random() * 370) + 80;
      setTimeout(simulateRetroLoading, delay);
    } else {
      setTimeout(() => {
        if (introScreen) introScreen.classList.add("fade-out");
      }, 500);
    }
  };

  simulateRetroLoading();

  // --- 2. GALERÍA FLOTANTE DE PRUEBA ---
  // Cambia estos nombres si tus imágenes de prueba se llaman distinto
  const imagenesObras = [
    "demo1.jpg",
    "demo2.jpg",
    "demo3.jpg"
  ];

  const galleryContainer = document.getElementById("floating-gallery");

  if (galleryContainer && imagenesObras.length > 0) {
    imagenesObras.forEach((imgSrc, index) => {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.classList.add("floating-item");

      // Posiciones aleatorias distribuidas por la pantalla
      const topPos = Math.floor(Math.random() * 65) + 10;
      const leftPos = Math.floor(Math.random() * 65) + 10;
      
      // Duración y tiempos escalonados para que floten en bucle sin sincronizarse
      const duration = Math.floor(Math.random() * 4) + 7; // Entre 7s y 10s
      const delay = index * 2; // Desfase entre imágenes

      img.style.top = `${topPos}%`;
      img.style.left = `${leftPos}%`;
      img.style.animationDuration = `${duration}s`;
      img.style.animationDelay = `${delay}s`;

      galleryContainer.appendChild(img);
    });
  }
});
