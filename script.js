document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 0. PRECARGA DE IMÁGENES CRÍTICAS
  // ==========================================
  const criticalImages = [
    'tv.png', 'vhs.png', 'chucky-knife.png', 
    'demo1.jpg', 'demo2.jpg', 'demo3.jpg'
  ];

  let loadedCount = 0;
  const totalImages = criticalImages.length;

  criticalImages.forEach(src => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loadedCount++;
    };
    img.src = src;
  });

  // ==========================================
  // 1. SIMULACIÓN DE CARGA RETRO (MÁS RÁPIDA)
  // ==========================================
  const introScreen = document.getElementById("intro-screen");
  const bloodTrail = document.getElementById("blood-trail");
  const knifeLoader = document.getElementById("knife-loader");
  const loadPercentage = document.getElementById("load-percentage");

  let progress = 0;
  const MAX_TIME = 3000; // Máximo 3 segundos
  const startTime = Date.now();

  const simulateRetroLoading = () => {
    const elapsed = Date.now() - startTime;
    
    // Si pasó el tiempo máximo o llegó a 100%, terminar
    if (progress >= 100 || elapsed > MAX_TIME) {
      progress = 100;
      if (bloodTrail) bloodTrail.style.width = `100%`;
      if (knifeLoader) knifeLoader.style.left = `100%`;
      if (loadPercentage) loadPercentage.textContent = 100;
      
      setTimeout(() => {
        if (introScreen) introScreen.classList.add("fade-out");
      }, 300);
      return;
    }

    // Incremento más rápido y consistente
    const increment = Math.floor(Math.random() * 15) + 8;
    progress = Math.min(progress + increment, 100);

    if (bloodTrail) bloodTrail.style.width = `${progress}%`;
    if (knifeLoader) knifeLoader.style.left = `${progress}%`;
    if (loadPercentage) loadPercentage.textContent = progress;

    // Más rápido: 50-150ms
    const delay = Math.floor(Math.random() * 100) + 50;
    setTimeout(simulateRetroLoading, delay);
  };

  simulateRetroLoading();

  // ==========================================
  // 2. GALERÍA FLOTANTE (SOLO DESKTOP)
  // ==========================================
  const imagenesObras = ["demo1.jpg", "demo2.jpg", "demo3.jpg"];
  const galleryContainer = document.getElementById("floating-gallery");
  const COPIAS_POR_IMAGEN = 3;

  // Solo en desktop
  if (window.innerWidth > 768 && galleryContainer && imagenesObras.length > 0) {
    let totalIndex = 0;

    for (let i = 0; i < COPIAS_POR_IMAGEN; i++) {
      imagenesObras.forEach((imgSrc) => {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.classList.add("floating-item");
        img.loading = "lazy";

        // Posiciones más alejadas del centro
        const topPos = Math.floor(Math.random() * 60) + 5;
        const leftPos = Math.floor(Math.random() * 60) + 5;
        const duration = Math.floor(Math.random() * 4) + 6;
        const delay = totalIndex * 0.8;

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

  // Plantillas HTML para cada sección de la TV
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

      // Animación ligera de empuje/expulsión
      tape.classList.add("ejecting");

      // Dispara la estática CRT
      if (tvStatic) tvStatic.classList.add("active");

      setTimeout(() => {
        tape.classList.remove("ejecting");
      }, 300);

      // Inyecta la vista correspondiente durante la estática
      setTimeout(() => {
        if (pages[type]) {
          tvContent.innerHTML = pages[type];
        }
        if (tvStatic) tvStatic.classList.remove("active");
      }, 450);
    });
  });
