# Xpiral · Portfolio

Portfolio web ligero para la artista Xpiral, pensado para abrirse rápidamente desde una tarjeta NFC. Está construido con HTML, CSS y JavaScript sin dependencias ni herramientas de compilación.

## Experiencia

- Pantalla de entrada con una espiral que se completa mientras se preparan las imágenes.
- Página principal con la bio provisional «Artista ochentera».
- Enlace directo a [Instagram](https://www.instagram.com/elenaxpiralart/).
- Galería independiente con vista ampliada, navegación entre obras con flechas y soporte para teclado.
- Diseño adaptable a móvil y escritorio, con respeto a la preferencia de movimiento reducido del dispositivo.

## Archivos

- \`index.html\`: presentación y enlaces principales.
- \`gallery.html\`: galería de artworks.
- \`style.css\`: estilos y adaptación a pantallas pequeñas.
- \`script.js\`: precarga de imágenes y controles de la galería.
- \`demo1.jpg\`, \`demo2.jpg\`, \`demo3.jpg\`: imágenes temporales para comprobar la galería.

## Cambiar las imágenes

Sustituye los tres archivos JPG por las obras finales, conservando los nombres para no tener que tocar el código. También puedes cambiar las rutas en \`gallery.html\` y en la lista \`artworkPaths\` de \`script.js\`.

## Publicación

El sitio es estático. Se puede publicar desde la rama \`main\` con GitHub Pages y enlazar la URL del sitio desde la tarjeta NFC.
