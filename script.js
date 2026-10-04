// ==========================================
//   CONTROLADOR COMPLETO VHS & CRT (80s)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // --- REPRODUCCIÓN DE FRAGMENTOS DE AUDIO VHS (vhs-sound.mp3) ---
  const AUDIO_SRC = "vhs-sound.mp3"; 

  // Función genérica para reproducir un rango exacto de segundos del MP3
  function playAudioSegment(startTime, duration) {
    const audio = new Audio(AUDIO_SRC);
    audio.currentTime = startTime;
    audio.play().catch(err => console.log("Permiso de audio requerido en móvil:", err));

    setTimeout(() => {
      audio.pause();
    }, duration * 1000);
  }

  // 1. Clic rápido (Parte 1: de 0.0s a 0.8s) -> Para botones pequeños / galería
  function playQuickClick() {
    playAudioSegment(0.0, 0.8);
  }

  // 2. Ruido de arrastre/estática (Parte 2: de 1.0s a 2.5s) -> Para el cambio de canal
  function playTapeMotor() {
    playAudioSegment(1.0, 1.5);
  }

  // 3. Golpe pesado de cassette (Parte 3: de 4.8s a 6.8s) -> Para seleccionar cinta VHS
  function playHeavyEject() {
    playAudioSegment(4.8, 1.8);
  }

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
    "demo1.jpg",
    "demo2.jpg",
    "demo3.jpg",
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

  let currentGalleryIndex = 0;
  const galleryImages = [
    "demo1.jpg",
    "demo2.jpg",
    "demo3.jpg"
  ];

  // Función de transición de canal sincronizada con tu static.gif y el audio del motor
  function switchChannel(renderCallback) {
    playTapeMotor(); // Reproduce el tramo de estática/arrastre del audio (1.5s)
    
    if (tvStatic) tvStatic.classList.add("active"); // Muestra tu static.gif animado
    
    // Hacemos coincidir el tiempo de cambio con la duración del efecto visual/sonoro
    setTimeout(() => {
      renderCallback(); // Cambia el contenido interno de la pantalla
      
      setTimeout(() => {
        if (tvStatic) tvStatic.classList.remove("active"); // Oculta el GIF de estática
      }, 300);
    }, 600);
  }

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
               alt="Artwork" 
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

  tapeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      playHeavyEject(); // Parte 3: Golpe pesado al presionar/insertar cinta VHS
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

  function bindGalleryEvents() {
    const prevBtn = document.getElementById("prev-art-btn");
    const nextBtn = document.getElementById("next-art-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        playQuickClick(); // Parte 1: Clic metálico corto al cambiar foto
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        playQuickClick(); // Parte 1: Clic metálico corto al cambiar foto
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }
  }
});
