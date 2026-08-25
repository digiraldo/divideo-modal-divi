const fs = require('fs');
let file = fs.readFileSync('visual-builder/src/module.json', 'utf8');

// Replace array options with object options for divi/select
file = file.replace(
  /"options": \[\s*\{\s*"value": "url",\s*"label": "URL \(YouTube \/ Vimeo\)"\s*\},\s*\{\s*"value": "local",\s*"label": "Vídeo Local \(MP4\/WebM\)"\s*\}\s*\]/g,
  `"options": {
    "url": "URL (YouTube / Vimeo)",
    "local": "Vídeo Local (MP4/WebM)"
  }`
);

file = file.replace(
  /"options": \[\s*\{\s*"value": "button",\s*"label": "Botón"\s*\},\s*\{\s*"value": "image",\s*"label": "Imagen con Play"\s*\},\s*\{\s*"value": "icon",\s*"label": "Ícono Animado"\s*\}\s*\]/g,
  `"options": {
    "button": "Botón",
    "image": "Imagen con Play",
    "icon": "Ícono Animado"
  }`
);

file = file.replace(
  /"options": \[\s*\{\s*"value": "circle_fill",\s*"label": "Círculo Relleno"\s*\},\s*\{\s*"value": "circle_outline",\s*"label": "Círculo Contorno"\s*\},\s*\{\s*"value": "play_arrow",\s*"label": "Flecha Simple"\s*\},\s*\{\s*"value": "rounded_rect",\s*"label": "Rectángulo \(YouTube\)"\s*\},\s*\{\s*"value": "diamond",\s*"label": "Rombo"\s*\}\s*\]/g,
  `"options": {
    "circle_fill": "Círculo Relleno",
    "circle_outline": "Círculo Contorno",
    "play_arrow": "Flecha Simple",
    "rounded_rect": "Rectángulo (YouTube)",
    "diamond": "Rombo"
  }`
);

fs.writeFileSync('visual-builder/src/module.json', file);
console.log('Fixed options');
