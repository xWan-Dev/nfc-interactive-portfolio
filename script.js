(() => {
  function setupLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const spiral = document.getElementById("spiral-fill");
    const percentage = document.getElementById("load-percentage");
    const length = spiral.getTotalLength();
    spiral.style.strokeDasharray = String(length);
    spiral.style.strokeDashoffset = String(length);

    // Simulación deliberada del ritmo de carga de una página clásica:
    // el progreso acelera y se detiene brevemente en algunos tramos.
    const loadingBeats = [
      [0, 0], [550, 12], [1250, 31], [1750, 34], [2450, 61],
      [2950, 65], [3650, 88], [4100, 91], [4650, 100]
    ];
    const startedAt = performance.now();

    function frame(now) {
      const elapsed = Math.min(now - startedAt, loadingBeats[loadingBeats.length - 1][0]);
      let segment = 1;
      while (segment < loadingBeats.length && elapsed > loadingBeats[segment][0]) segment += 1;

      const [startTime, startProgress] = loadingBeats[segment - 1];
      const [endTime, endProgress] = loadingBeats[Math.min(segment, loadingBeats.length - 1)];
      const position = (elapsed - startTime) / (endTime - startTime);
      const progress = Math.round(startProgress + (endProgress - startProgress) * position);

      spiral.style.strokeDashoffset = String(length * (1 - progress / 100));
      percentage.textContent = progress + "%";

      if (elapsed >= loadingBeats[loadingBeats.length - 1][0]) {
        window.setTimeout(() => loader.classList.add("is-done"), 260);
        return;
      }
      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  function setupGallery() {
    const dialog = document.getElementById("lightbox");
    if (!dialog) return;

    const buttons = Array.from(document.querySelectorAll(".gallery-item"));
    const image = document.getElementById("lightbox-image");
    const caption = document.getElementById("lightbox-caption");
    let activeIndex = 0;

    function showArtwork(index) {
      activeIndex = (index + buttons.length) % buttons.length;
      const button = buttons[activeIndex];
      image.src = button.dataset.image;
      image.alt = button.querySelector("img").alt;
      caption.textContent = button.dataset.title;
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        showArtwork(index);
        dialog.showModal();
      });
    });

    dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".lightbox__nav--prev").addEventListener("click", () => showArtwork(activeIndex - 1));
    dialog.querySelector(".lightbox__nav--next").addEventListener("click", () => showArtwork(activeIndex + 1));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") showArtwork(activeIndex - 1);
      if (event.key === "ArrowRight") showArtwork(activeIndex + 1);
    });
  }

  setupLoader();
  setupGallery();
})();