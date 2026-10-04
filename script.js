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

  // --- 3. LÓGICA DE INTERACCIÓN CINTAS VHS Y TELEVISOR CRT ---
  const tapes = document.querySelectorAll(".vhs-tape");
  const tvContent = document.getElementById("tv-content");
  const tvStatic = document.getElementById("tv-static");

  tapes.forEach((tape) => {
    tape.addEventListener("click", () => {
      const type = tape.getAttribute("data-type");
      const url = tape.getAttribute("data-url");

      // 1. Animación ligera de la cinta al seleccionarse
      tape.classList.add("ejecting");

      // 2. Activa el chispazo de estática en la TV
      if (tvStatic) tvStatic.classList.add("active");

      setTimeout(() => {
        tape.classList.remove("ejecting");
      }, 300);

      // 3. Cambia el contenido del televisor a mitad de la estática
      setTimeout(() => {
        if (type === "instagram") {
          tvContent.innerHTML = `
            <h2 style="color:#ff0055; margin-bottom: 5px;">INSTAGRAM</h2>
            <p style="font-size: 0.8rem; color: #a2c4c9;">Canal oficial de obras</p>
            <a href="${url}" target="_blank" rel="noopener">▶ ABRIR PERFIL</a>
          `;
        } else if (type === "email") {
          tvContent.innerHTML = `
            <h2 style="color:#00ffff; margin-bottom: 5px;">CONTACTO</h2>
            <p style="font-size: 0.8rem; color: #a2c4c9;">¿Encargos o colaboraciones?</p>
            <a href="${url}">▶ ENVIAR CORREO</a>
          `;
        } else if (type === "bio") {
          tvContent.innerHTML = `
            <h2 style="color:#ffff00; margin-bottom: 5px;">SOBRE EL ARTISTA</h2>
            <p style="font-size:0.8rem; line-height:1.3; color:#e8d595;">
              Universo visual inspirado en el cine slasher de los 80, estética VHS y cultura pop oscura.
            </p>
          `;
        }

        // 4. Desactiva la estática para revelar el nuevo canal
        if (tvStatic) tvStatic.classList.remove("active");
      }, 600);
    });
  });
});
