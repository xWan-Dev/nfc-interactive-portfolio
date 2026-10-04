// ==========================================
//   CONTROLADOR COMPLETO VHS & CRT (80s)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const AUDIO_SRC = "vhs-sound.mp3"; 

  function playAudioSegment(startTime, duration) {
    const audio = new Audio(AUDIO_SRC);
    audio.currentTime = startTime;
    audio.play().catch(err => console.log("Permiso de audio requerido en móvil:", err));
    setTimeout(() => { audio.pause(); }, duration * 1000);
  }

  function playQuickClick() { playAudioSegment(0.0, 0.8); }
  function playTapeMotor() { playAudioSegment(1.0, 1.5); }
  function playHeavyEject() { playAudioSegment(4.8, 1.8); }

  // --- 1. PANTALLA DE CARGA ---
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
      setTimeout(() => { if (introScreen) introScreen.classList.add("fade-out"); }, 400);
    }
  }, 40);

  // --- 2. GALERÍA FLOTANTE ---
  const floatingGallery = document.getElementById("floating-gallery");
  const sampleImages = ["demo1.jpg", "demo2.jpg", "demo3.jpg", "chucky-knife.png"];
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

  // --- 3. REPRODUCTOR TV ---
  const tvContent = document.getElementById("tv-content");
  const tvStatic = document.getElementById("tv-static");
  const tapeButtons = document.querySelectorAll(".vhs-tape-card");

  let currentGalleryIndex = 0;
  const galleryImages = ["demo1.jpg", "demo2.jpg", "demo3.jpg"];

  function switchChannel(renderCallback) {
    playTapeMotor();
    if (tvStatic) tvStatic.classList.add("active");
    setTimeout(() => {
      renderCallback();
      setTimeout(() => { if (tvStatic) tvStatic.classList.remove("active"); }, 300);
    }, 600);
  }

  const views = {
    home: () => `
      <div class="vhs-screen-layout">
        <h1 class="neon-title">XPIRAL</h1>
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
          <img src="${galleryImages[currentGalleryIndex]}" alt="Artwork" class="gallery-display-img" onerror="this.src='chucky-knife.png'">
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
        <p class="bio-text">Ilustración & Arte visual inspirado en el cine de terror de los 80s, slashers, estética VHS y la cultura pop retro.</p>
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

  tvContent.innerHTML = views.home();

  // Control mediante cintas VHS de la estantería
  tapeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      playHeavyEject();
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
        playQuickClick();
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        playQuickClick();
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }
  }

  // --- INTERACTIVIDAD ÚNICAMENTE DEL DIAL GRANDE ---
  const bigDial = document.querySelector(".btn-big-dial");
  if (bigDial) {
    bigDial.addEventListener("click", () => {
      const isGalleryActive = document.querySelector(".tv-gallery-container") !== null;

      if (!isGalleryActive) {
        playQuickClick();
        return; // Si no estás en la galería, el dial no cambia de foto ni hace nada destructivo
      }

      playQuickClick();
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
      switchChannel(() => {
        tvContent.innerHTML = views.gallery();
        bindGalleryEvents();
      });
    });
  }

});
