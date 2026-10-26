import fs from 'node:fs';
import path from 'node:path';

const root = '/home/ubuntu/enduring-advantage/client/src';
const technicalProperties = /(alignItems|justifyContent|textAlign|placeItems|placeContent|backgroundPosition|backgroundPositionX|backgroundPositionY|objectPosition|transformOrigin)\s*:\s*'centre'/g;

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(entryPath));
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(entryPath);
  }
  return files;
}

let repairs = 0;
for (const file of walk(root)) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = original
    .replace(technicalProperties, "$1: 'center'")
    .replaceAll('items-centre', 'items-center')
    .replaceAll('justify-centre', 'justify-center')
    .replaceAll('text-centre', 'text-center')
    .replaceAll('place-items-centre', 'place-items-center')
    .replaceAll('origin-centre', 'origin-center')
    .replaceAll('content-centre', 'content-center');
  if (updated !== original) {
    repairs += (original.match(technicalProperties) ?? []).length;
    fs.writeFileSync(file, updated);
  }
}
console.log(`Restored ${repairs} technical alignment values to the CSS-required spelling.`);
