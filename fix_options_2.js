const fs = require('fs');
let file = JSON.parse(fs.readFileSync('visual-builder/src/module.json', 'utf8'));

// Convert options back to the correct Divi 5 format
file.attributes.videoSource.settings.innerContent.item.component.props.options = {
  url: { label: "URL (YouTube / Vimeo)" },
  local: { label: "Vídeo Local (MP4/WebM)" }
};

file.attributes.triggerType.settings.innerContent.item.component.props.options = {
  button: { label: "Botón" },
  image: { label: "Imagen con Play" },
  icon: { label: "Ícono Animado" }
};

file.attributes.iconStyle.settings.innerContent.item.component.props.options = {
  circle_fill: { label: "Círculo Relleno" },
  circle_outline: { label: "Círculo Contorno" },
  play_arrow: { label: "Flecha Simple" },
  rounded_rect: { label: "Rectángulo (YouTube)" },
  diamond: { label: "Rombo" }
};

// Remove the incorrect show_if attributes that might break Divi 5 visibility
const removeShowIf = (attr) => {
  if (file.attributes[attr]?.settings?.innerContent?.item?.features?.show_if) {
    delete file.attributes[attr].settings.innerContent.item.features.show_if;
  }
};

removeShowIf('videoUrl');
removeShowIf('videoFile');
removeShowIf('buttonText');
removeShowIf('triggerImageSrc');
removeShowIf('triggerImageAlt');
removeShowIf('iconStyle');
removeShowIf('iconColor');
removeShowIf('iconSize');

fs.writeFileSync('visual-builder/src/module.json', JSON.stringify(file, null, 2));
console.log('Fixed options and removed show_if');
