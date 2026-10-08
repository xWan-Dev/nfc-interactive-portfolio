(() => {
  const artworkPaths = ["demo1.jpg", "demo2.jpg", "demo3.jpg"];

  function setupLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    const spiral = document.getElementById("spiral-fill");
    const percentage = document.getElementById("load-percentage");
    const length = spiral.getTotalLength();
    spiral.style.strokeDasharray = String(length);
    spiral.style.strokeDashoffset = String(length);

    const images = artworkPaths.map((src) => new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => resolve();
      image.src = src;
      if (image.complete) resolve();
    }));

    const startedAt = performance.now();
    let loaded = 0;
    images.forEach((image) => image.then(() => { loaded += 1; }));
    const minDuration = 1200;

    function frame(now) {
      const elapsed = now - startedAt;
      const timeProgress = Math.min(82, elapsed / 1500 * 82);
      const imageProgress = loaded / artworkPaths.length * 96;
      const progress = Math.min(96, Math.max(timeProgress, imageProgress));
      spiral.style.strokeDashoffset = String(length * (1 - progress / 100));
      percentage.textContent = Math.floor(progress) + "%";

      if (loaded === artworkPaths.length && elapsed >= minDuration) {
        spiral.style.strokeDashoffset = "0";
        percentage.textContent = "100%";
        window.setTimeout(() => loader.classList.add("is-done"), 240);
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