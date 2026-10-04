document.addEventListener("DOMContentLoaded", () => {
  // --- SINTETIZADOR DE EFECTOS DE SONIDO RETRO (WEB AUDIO API) ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Reproduce un clic mecánico de botón / cinta VHS
  function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  }

  // Reproduce un chispazo de estática / cambio de canal CRT
  function playStaticSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const bufferSize = audioCtx.sampleRate * 0.25; // 0.25 segundos de sonido
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // Ruido blanco
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1000;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    whiteNoise.start();
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

  function switchChannel(renderCallback) {
    playStaticSound(); // Sonido de estática CRT
    if (tvStatic) tvStatic.classList.add("active");
    setTimeout(() => {
      renderCallback();
      setTimeout(() => {
        if (tvStatic) tvStatic.classList.remove("active");
      }, 250);
    }, 200);
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
      playClickSound(); // Clic de inserción VHS
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
        playClickSound(); // Clic cambio de obra
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        playClickSound(); // Clic cambio de obra
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
        switchChannel(() => {
          tvContent.innerHTML = views.gallery();
          bindGalleryEvents();
        });
      });
    }
  }
});
