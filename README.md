# 🔪 NFC Artist Canvas

**NFC Artist Canvas** es una plantilla web interactiva, ligera y altamente optimizada, diseñada para ser vinculada directamente a **tarjetas físicas NFC**. Al escanear la tarjeta con cualquier smartphone, el usuario accede a una experiencia inmersiva que combina la estética *slasher* (inspirada en la saga de películas *El Muñeco Diabólico / Chucky*) con la exposición digital del trabajo de un artista.

El proyecto pone un foco especial en la **privacidad e integridad de la obra artística**, garantizando que ningún contenido visual sea procesado, analizado o expuesto a modelos de Inteligencia Artificial de terceros.

---

## ✨ Características Principales

- **📱 Integración NFC Físico-Digital:** Pensado para cargarse al instante al acercar un dispositivo móvil a una tarjeta física NFC grabado con el enlace de GitHub Pages.
- **🔪 Animación de Carga Temática:** Intro cinemática con efecto de corte de cuchillo metálico antes de desplegar el contenido principal.
- **🎨 Estética Chucky (Pastel & Dark):** Paleta de color dominada por tonos negro carbón (`#0c0b0e`) y rojo sangre (`#d61a1a`), contrastada con detalles en azul, amarillo y rosa pastel representativos de la saga.
- **🖼️ Galería Flotante Dinámica:** Las imágenes del artista aparecen y se desvanecen en segundo plano con efectos suaves de flotación (`fade-in` / `fade-out`), creando un fondo envolvente.
- **📇 Tarjeta de Contacto Central:** Tarjetero con efecto cristal translúcido (*backdrop blur*) que destaca el nombre del artista, biografía y enlaces directos a Instagram y correo electrónico.
- **🔒 Privacidad y Cero IA (100% Local):** Todo el procesamiento de imágenes e información de contacto se ejecuta en el navegador del cliente (*Vanilla JS*). Ninguna obra se envía a servidores externos ni a APIs de scraping/IA.

---

## 🛠️ Arquitectura y Tecnologías

- **HTML5 & CSS3:** Animaciones con fotogramas clave (`keyframes`), Flexbox y variables CSS.
- **JavaScript Vanilla:** Lógica ligera para el control de temporizadores de intro y generación dinámica de elementos flotantes.
- **GitHub Pages:** Alojamiento web estático gratuito, rápido y seguro.

---

## 📂 Estructura del Repositorio

```text
nfc-artist-canvas/
├── index.html              # Estructura principal de la web
├── style.css               # Estilos, variables de color e identidades visuales
├── script.js              # Lógica de animaciones y galería
├── README.md               # Documentación del proyecto
└── assets/
    ├── cuchillo.svg        # Ilustración/Animación del cuchillo
    └── galeria/            # Carpeta para las obras del artista
        ├── obra1.webp
        ├── obra2.webp
        └── obra3.webp

🚀 Guía de Uso para el Artista
1. Personalización de Datos
Edita los datos del artista dentro del archivo index.html:

<h1 class="artist-name">Tu Nombre</h1>
<p class="artist-bio">Tu biografía aquí...</p>
<a href="[https://instagram.com/tu_usuario](https://instagram.com/tu_usuario)">Instagram</a>

2. Carga de Obras
Coloca tus imágenes en la carpeta /assets/galeria/. Se recomienda el formato .webp o .png optimizado para minimizar el consumo de datos móviles al escanear la tarjeta.

3. Publicación y Grabado NFC
Haz Push de los cambios a la rama main de este repositorio.

- Ve a Settings > Pages en GitHub y activa el despliegue desde la rama main.

- Copia la URL generada (https://<tu-usuario>.github.io/nfc-artist-canvas/).

- Usa una aplicación de grabado NFC (como NFC Tools) para escribir la URL en el chip de tu tarjeta.

📜 Licencia y Privacidad
Este proyecto es de código abierto. Garantiza la protección de los derechos de autor al no conectarse a ninguna plataforma externa que recopile datos de imágenes.

