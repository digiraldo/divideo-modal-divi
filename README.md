# 🎬 DiVideo Modal for Divi 5

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org)
[![Divi 5 Ready](https://img.shields.io/badge/Divi-5.0%2B%20Ready-purple.svg)](https://www.elegantthemes.com)
[![PHP](https://img.shields.io/badge/PHP-7.4%2B-777bb4.svg)](https://www.php.net)
[![License: GPL v2+](https://img.shields.io/badge/License-GPL%20v2%2B-green.svg)](LICENSE)

**DiVideo Modal for Divi** es un módulo de extensión premium diseñado específicamente para la nueva arquitectura modular de **Divi 5**. Permite desplegar vídeos (YouTube, Vimeo o archivos locales MP4/WebM) en una elegante ventana emergente modal (*lightbox / popup*) con reproducción automática, soporte de accesibilidad y personalización completa.

---

## ✨ Características Principales

### 📹 Fuentes de Vídeo Soportadas
- **Enlace Externo:** Integración automática para URLs de **YouTube** (incluyendo Shorts) y **Vimeo**.
- **Vídeo Local:** Carga directa de vídeos desde la Biblioteca de Medios de WordPress (`.mp4`, `.webm`).
- **Autoplay Inteligente:** Control para iniciar la reproducción automática al abrir el modal.

### 🖱️ 3 Tipos de Activadores (*Triggers*)
1. **🔴 Botón Nativo Divi 5:** Totalmente integrado con el sistema de diseño de botones de Divi 5 (soporta tipografías, gradientes, bordes, sombras, efectos hover y templates predeterminados de botones).
2. **🖼️ Imagen con Play:** Sube una miniatura (*thumbnail*) con texto alternativo SEO, control de ancho responsivo, control de opacidad/transparencia (0% - 100%) y botón de Play superpuesto con micro-animaciones.
3. **⭕ Ícono Animado:** Galería con **12 variantes vectoriales SVG**:
   - Círculo Relleno (Clásico)
   - Círculo Contorno (Línea)
   - Doble Círculo Concéntrico
   - Círculo Efecto Cristal (*Glassmorphism*)
   - Flecha Simple (*Minimal*)
   - Rectángulo Estilo YouTube
   - Cuadrado Redondeado (*App Style*)
   - Rombo Geométrico
   - Hexágono Moderno
   - Escudo / Insignia
   - Círculo con Anillo Punteado
   - Cápsula / Botón Flotante

### 🎛️ Configuración de la Ventana Modal
- **Color y Opacidad del Fondo (Overlay):** Selector dinámico de color y transparencia.
- **Ancho Máximo:** Control deslizante responsivo de 300px a 1600px (por defecto: 900px).
- **Botón Cerrar (X) de Alto Contraste:** Botón accesible con micro-animación al pasar el ratón.
- **Cierre Multi-Vía:** Cierra haciendo clic en la X, en cualquier parte del fondo oscuro o pulsando la tecla `ESC`.
- **Portal al Body:** El modal se renderiza en la raíz del documento (`document.body`) evitando que headers fijos o barras de navegación (*navbar*) lo tapen o corten.

---

## 🚀 Requisitos e Instalación

### Requisitos
- WordPress 6.0 o superior.
- PHP 7.4 o superior.
- Tema Divi con **Divi 5** activo.

### Instalación Manual
1. Descarga el repositorio como archivo ZIP o clónalo en tu directorio de plugins:
   ```bash
   cd wp-content/plugins/
   git clone https://github.com/digiraldo/divideo-modal-divi.git
   ```
2. Accede al panel de administración de WordPress > **Plugins**.
3. Activa el plugin **DiVideo Modal for Divi**.
4. Abre cualquier página con el **Visual Builder de Divi 5** e inserta el módulo **DiVideo Modal**.

---

## 🛠️ Desarrollo y Compilación

Para compilar o modificar el código fuente del Visual Builder:

```bash
cd visual-builder
npm install
npm run build
```

---

## 👤 Autor

- **Autor:** [Di Giraldo](https://github.com/digiraldo)
- **Contacto:** disaned@hotmail.com

## 📄 Licencia

Este proyecto está bajo la Licencia GNU General Public License v2 o posterior ([GPLv2+](LICENSE)).
