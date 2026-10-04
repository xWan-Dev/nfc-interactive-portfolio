document.addEventListener("DOMContentLoaded", () => {
  // 1. Manejo de la pantalla de Intro (Cuchillo)
  const introScreen = document.getElementById("intro-screen");
  
  setTimeout(() => {
    introScreen.classList.add("fade-out");
  }, 2200);

  // 2. Galería Flotante Automática
  // El artista solo necesita poner los nombres de sus imágenes aquí:
  const imagenesObras = [
    "assets/galeria/obra1.jpg",
    "assets/galeria/obra2.jpg",
    "assets/galeria/obra3.jpg"
  ];

  const galleryContainer = document.getElementById("floating-gallery");

  if (galleryContainer && imagenesObras.length > 0) {
    imagenesObras.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Obra ${index + 1}`;
      img.classList.add("floating-item");

      // Posicionamiento aleatorio en pantalla (evitando los bordes extremos)
      const randomTop = Math.floor(Math.random() * 70) + 10; // entre 10% y 80%
      const randomLeft = Math.floor(Math.random() * 70) + 10; // entre 10% y 80%
      
      // Retraso en la animación para que no aparezcan todas juntas
      const delay = (index * 2.5) + (Math.random() * 1.5); 
      const duration = 7 + Math.random() * 3; // Duración entre 7s y 10s

      img.style.top = `${randomTop}%`;
      img.style.left = `${randomLeft}%`;
      img.style.animationDelay = `${delay}s`;
      img.style.animationDuration = `${duration}s`;

      galleryContainer.appendChild(img);
    });
  }
});
