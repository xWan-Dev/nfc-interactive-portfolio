document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. SIMULACIÓN DE CARGA RETRO 80s
  // ==========================================
  const introScreen = document.getElementById("intro-screen");
  const bloodTrail = document.getElementById("blood-trail");
  const knifeLoader = document.getElementById("knife-loader");
  const loadPercentage = document.getElementById("load-percentage");

  let progress = 0;

  const simulateRetroLoading = () => {
    if (progress < 100) {
      const increment = Math.floor(Math.random() * 12) + 1;
      progress = Math.min(progress + increment, 100);

      if (bloodTrail) bloodTrail.style.width = `${progress}%`;
      if (knifeLoader) knifeLoader.style.left = `${progress}%`;
      if (loadPercentage) loadPercentage.textContent = progress;

      const delay = Math.floor(Math.random() * 200) + 50;
      setTimeout(simulateRetroLoading, delay);
    } else {
      setTimeout(() => {
        if (introScreen) introScreen.classList.add("fade-out");
      }, 400);
    }
  };

  // Iniciar la barra de carga de inmediato
  simulateRetroLoading();

  // ==========================================
  // 2. GALERÍA FLOTANTE EN EL FONDO
  // ==========================================
  const imagenesObras = ["demo1.jpg", "demo2.jpg", "demo3.jpg"];
  const galleryContainer = document.getElementById("floating-gallery");
  const COPIAS_POR_IMAGEN = 4;

  if (galleryContainer && imagenesObras.length > 0) {
    let totalIndex = 0;

    for (let i = 0; i < COPIAS_POR_IMAGEN; i++) {
      imagenesObras.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("floating-item");

        const topPos = Math.floor(Math.random() * 75) + 5;
        const leftPos = Math.floor(Math.random() * 75) + 5;
        const duration = Math.floor(Math.random() * 5) + 7;
        const delay = totalIndex * 1.2;

        img.style.top = `${topPos}%`;
        img.style.left = `${leftPos}%`;
        img.style.animationDuration = `${duration}s`;
        img.style.animationDelay = `${delay}s`;

        galleryContainer.appendChild(img);
        totalIndex++;
      });
    }
  }

  // ==========================================
  // 3. LÓGICA DE NAVEGACIÓN SPA EN LA TV
  // ==========================================
  const tapes = document.querySelectorAll(".vhs-tape-card");
  const tvContent = document.getElementById("tv-content");
  const tvStatic = document.getElementById("tv-static");

  // Plantillas para las pantallas de la TV
  const pages = {
    home: `
      <h1 class="artist-name">Tu Nombre</h1>
      <p class="artist-tagline">Arte & Ilustración 80s</p>
      <p class="artist-bio">Selecciona o desliza una cinta para reproducir contenido.</p>
    `,
    gallery: `
      <h2 style="color:#00ffff; font-size:0.95rem; margin-bottom: 4px;">GALERÍA DE OBRAS</h2>
      <p style="font-size:0.58rem; color:#a2c4c9; margin-bottom: 6px;">PORTAFOLIO VISUAL</p>
      <a href="https://instagram.com/tu_usuario" target="_blank" rel="noopener">▶ VER EN INSTAGRAM</a>
    `,
    bio: `
      <h2 style="color:#ffff00; font-size:0.95rem; margin-bottom: 4px;">BIOGRAFÍA</h2>
      <p style="font-size:0.58rem; line-height:1.25; color:#e8d595;">
        Ilustración & Arte visual inspirado en el cine de terror de los 80s, slashers y estética VHS.
      </p>
    `,
    contact: `
      <h2 style="color:#ff0055; font-size:0.95rem; margin-bottom: 4px;">CONTACTO</h2>
      <p style="font-size:0.58rem; color:#a2c4c9; margin-bottom: 6px;">COMISIONES Y DUDAS</p>
      <a href="mailto:tu_correo@email.com">▶ ENVIAR MAIL</a>
    `
  };

  tapes.forEach((tape) => {
    tape.addEventListener("click", () => {
      const type = tape.getAttribute("data-type");

      // Animación ligera de expulsión
      tape.classList.add("ejecting");

      // Ráfaga de estática CRT
      if (tvStatic) tvStatic.classList.add("active");

      setTimeout(() => {
        tape.classList.remove("ejecting");
      }, 300);

      // Cambia el texto dentro de la TV
      setTimeout(() => {
        if (pages[type]) {
          tvContent.innerHTML = pages[type];
        }
        if (tvStatic) tvStatic.classList.remove("active");
      }, 450);
    });
  });
});
