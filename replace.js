const fs = require('fs');
let f = fs.readFileSync('visual-builder/src/module.json', 'utf8');
f = f.replace(/"groupSlug"/g, '"groupName"');
fs.writeFileSync('visual-builder/src/module.json', f);
