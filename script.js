document.addEventListener("DOMContentLoaded", () => {
  // --- 1. PANTALLA DE CARGA CON CUCHILLO ---
  const introScreen = document.getElementById("intro-screen");
  const bloodTrail = document.getElementById("blood-trail");
  const knifeLoader = document.getElementById("knife-loader");
  const loadPercentage = document.getElementById("load-percentage");

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 2;
    if (progress > 100) progress = 100;

    if (bloodTrail) bloodTrail.style.width = `${progress}%`;
    if (knifeLoader) knifeLoader.style.left = `${progress}%`;
    if (loadPercentage) loadPercentage.textContent = progress;

    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        if (introScreen) introScreen.classList.add("fade-out");
      }, 400);
    }
  }, 40);

  // --- 2. GALERÍA FLOTANTE EN EL FONDO ---
  const floatingGallery = document.getElementById("floating-gallery");
  const sampleImages = [
    "artwork1.jpg",
    "artwork2.jpg",
    "artwork3.jpg",
    "chucky-knife.png"
  ];

  if (floatingGallery) {
    for (let i = 0; i < 12; i++) {
      const item = document.createElement("img");
      item.src = sampleImages[i % sampleImages.length];
      item.classList.add("floating-item");
      item.style.left = `${Math.random() * 90}%`;
      item.style.top = `${Math.random() * 90}%`;
      item.style.animationDuration = `${8 + Math.random() * 10}s`;
      item.style.animationDelay = `${Math.random() * 5}s`;
      floatingGallery.appendChild(item);
    }
  }

  // --- 3. REPRODUCTOR Y CAMBIO DE CINTAS VHS EN LA TV ---
  const tvContent = document.getElementById("tv-content");
  const tvStatic = document.getElementById("tv-static");
  const tapeButtons = document.querySelectorAll(".vhs-tape-card");

  // Estado de la galería interna de la TV
  let currentGalleryIndex = 0;
  const galleryImages = [
    "artwork1.jpg",
    "artwork2.jpg",
    "artwork3.jpg"
  ];

  // Función para simular cambio de canal con nieve/estática CRT
  function switchChannel(renderCallback) {
    if (tvStatic) tvStatic.classList.add("active");
    setTimeout(() => {
      renderCallback();
      setTimeout(() => {
        if (tvStatic) tvStatic.classList.remove("active");
      }, 250);
    }, 200);
  }

  // Plantillas HTML retro para cada cinta VHS
  const views = {
    home: () => `
      <div class="vhs-screen-layout">
        <h1 class="neon-title">TU NOMBRE</h1>
        <p class="neon-subtitle">ARTE & ILUSTRACIÓN 80s</p>
        <div class="vhs-badge">PLAY ▶ 0:00:01</div>
        <p class="vhs-prompt">Selecciona o desliza una cinta para reproducir contenido.</p>
      </div>
    `,
    gallery: () => `
      <div class="tv-gallery-container">
        <div class="gallery-header">
          <span class="vhs-badge">OBRAS [${currentGalleryIndex + 1}/${galleryImages.length}]</span>
        </div>
        <div class="gallery-frame">
          <img src="${galleryImages[currentGalleryIndex]}" 
               alt="Obra de Arte" 
               class="gallery-display-img"
               onerror="this.src='chucky-knife.png'">
        </div>
        <div class="gallery-nav">
          <button id="prev-art-btn" class="tv-btn">◀ ANTERIOR</button>
          <button id="next-art-btn" class="tv-btn">SIGUIENTE ▶</button>
        </div>
      </div>
    `,
    bio: () => `
      <div class="vhs-screen-layout">
        <h2 class="neon-title-sm">BIOGRAFÍA</h2>
        <p class="bio-text">
          Ilustración & Arte visual inspirado en el cine de terror de los 80s, slashers, estética VHS y la cultura pop retro.
        </p>
        <div class="vhs-badge">HI-FI STEREO</div>
      </div>
    `,
    contact: () => `
      <div class="vhs-screen-layout">
        <h2 class="neon-title-sm">CONTACTO</h2>
        <p class="vhs-prompt">Comisiones y dudas de trabajo:</p>
        <a href="mailto:tuemail@ejemplo.com" class="retro-mail-btn">▶ ENVIAR MAIL</a>
      </div>
    `
  };

  // Asignar evento a las cintas VHS
  tapeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.getAttribute("data-type");
      button.classList.add("ejecting");
      setTimeout(() => button.classList.remove("ejecting"), 300);

      if (views[type]) {
        switchChannel(() => {
          tvContent.innerHTML = views[type]();
          if (type === "gallery") bindGalleryEvents();
        });
      }
    });
  });

  // Eventos para los botones de anterior/siguiente en la Galería
  function bindGalleryEvents() {
    const prevBtn = document.getElementById("prev-art-btn");
    const nextBtn = document.getElementById("next-art-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }
  }
});
