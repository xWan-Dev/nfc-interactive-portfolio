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

  // --- 2. GALERÍA FLOTANTE MULTIPLICADA (FONDO DINÁMICO) ---
  const imagenesObras = [
    "demo1.jpg",
    "demo2.jpg",
    "demo3.jpg"
  ];

  const galleryContainer = document.getElementById("floating-gallery");
  const COPIAS_POR_IMAGEN = 4; // Multiplica cada imagen para llenar el fondo

  if (galleryContainer && imagenesObras.length > 0) {
    let totalIndex = 0;

    // Duplicamos las imágenes para repartirlas por todo el canvas
    for (let i = 0; i < COPIAS_POR_IMAGEN; i++) {
      imagenesObras.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("floating-item");

        // Distribuimos en un rango amplio de la pantalla (de 5% a 80%)
        const topPos = Math.floor(Math.random() * 75) + 5;
        const leftPos = Math.floor(Math.random() * 75) + 5;
        
        // Tiempos y duraciones aleatorias para evitar que aparezcan a la vez
        const duration = Math.floor(Math.random() * 5) + 7; // Entre 7s y 12s
        const delay = totalIndex * 1.2; // Aparición escalonada continua

        img.style.top = `${topPos}%`;
        img.style.left = `${leftPos}%`;
        img.style.animationDuration = `${duration}s`;
        img.style.animationDelay = `${delay}s`;

        galleryContainer.appendChild(img);
        totalIndex++;
      });
    }
  }
});
