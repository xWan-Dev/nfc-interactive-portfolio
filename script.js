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
  // 3. LÓGICA INTERACTIVA VHS Y TELEVISOR
  // ==========================================
  const tapes = document.querySelectorAll(".vhs-tape-card");
  const tvContent = document.getElementById("tv-content");
  const tvStatic = document.getElementById("tv-static");

  tapes.forEach((tape) => {
    tape.addEventListener("click", () => {
      const type = tape.getAttribute("data-type");
      const url = tape.getAttribute("data-url");

      // Animación de expulsión ligera de la cinta seleccionada
      tape.classList.add("ejecting");

      // Activa ráfaga de estática e interferencia CRT
      if (tvStatic) tvStatic.classList.add("active");

      setTimeout(() => {
        tape.classList.remove("ejecting");
      }, 300);

      // Cambia el contenido dentro del tubo de la tele mientras dura la estática
      setTimeout(() => {
        if (type === "instagram") {
          tvContent.innerHTML = `
            <h2 style="color:#ff0055; font-size:1rem; margin-bottom: 2px;">INSTAGRAM</h2>
            <p style="font-size: 0.58rem; color: #a2c4c9; margin-bottom:4px;">PORTAFOLIO VISUAL</p>
            <a href="${url}" target="_blank" rel="noopener">▶ VER PERFIL</a>
          `;
        } else if (type === "email") {
          tvContent.innerHTML = `
            <h2 style="color:#00ffff; font-size:1rem; margin-bottom: 2px;">CONTACTO</h2>
            <p style="font-size: 0.58rem; color: #a2c4c9; margin-bottom:4px;">COMISIONES & DUDAS</p>
            <a href="${url}">▶ ENVIAR MAIL</a>
          `;
        } else if (type === "bio") {
          tvContent.innerHTML = `
            <h2 style="color:#ffff00; font-size:1rem; margin-bottom: 2px;">BIOGRAFÍA</h2>
            <p style="font-size:0.58rem; line-height:1.2; color:#e8d595;">
              Ilustración & Arte visual inspirado en el cine de terror de los 80s y estética VHS.
            </p>
          `;
        }

        // Retira la estática revelando el nuevo contenido
        if (tvStatic) tvStatic.classList.remove("active");
      }, 450);
    });
  });
});
