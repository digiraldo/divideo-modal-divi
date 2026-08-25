const fs = require('fs');
let file = JSON.parse(fs.readFileSync('visual-builder/src/module.json', 'utf8'));

// videoUrl
file.attributes.videoUrl.settings.innerContent.item.features = {
  ...file.attributes.videoUrl.settings.innerContent.item.features,
  show_if: { videoSource: "url" }
};

// videoFile
file.attributes.videoFile.settings.innerContent.item.features = {
  ...file.attributes.videoFile.settings.innerContent.item.features,
  show_if: { videoSource: "local" }
};

// buttonText
file.attributes.buttonText.settings.innerContent.item.features = {
  ...file.attributes.buttonText.settings.innerContent.item.features,
  show_if: { triggerType: "button" }
};

// triggerImageSrc
file.attributes.triggerImageSrc.settings.innerContent.item.features = {
  ...file.attributes.triggerImageSrc.settings.innerContent.item.features,
  show_if: { triggerType: "image" }
};

// triggerImageAlt
file.attributes.triggerImageAlt.settings.innerContent.item.features = {
  ...file.attributes.triggerImageAlt.settings.innerContent.item.features,
  show_if: { triggerType: "image" }
};

// iconStyle, iconColor, iconSize
file.attributes.iconStyle.settings.innerContent.item.features = {
  ...file.attributes.iconStyle.settings.innerContent.item.features,
  show_if: { triggerType: "icon" }
};
file.attributes.iconColor.settings.innerContent.item.features = {
  ...file.attributes.iconColor.settings.innerContent.item.features,
  show_if: { triggerType: "icon" }
};
file.attributes.iconSize.settings.innerContent.item.features = {
  ...file.attributes.iconSize.settings.innerContent.item.features,
  show_if: { triggerType: "icon" }
};

fs.writeFileSync('visual-builder/src/module.json', JSON.stringify(file, null, 2));
console.log('Added show_if conditions');
