import fs from 'node:fs';
import path from 'node:path';

const root = '/home/ubuntu/enduring-advantage';
const targets = [
  'client/src/pages',
  'client/src/components',
  'client/src/lib',
  'server/seo.ts',
  'client/public/llms.txt',
];

const protectedTerms = new Map([
  ['Environmental Defense Fund', '__EA_PROTECTED_ENVIRONMENTAL_DEFENSE_FUND__'],
  ['Colorifix', '__EA_PROTECTED_COLORIFIX__'],
  ['Worldfavor', '__EA_PROTECTED_WORLDFAVOR__'],
]);

const replacements = [
  [/\borganisations\b/gi, 'organizations'],
  [/\borganisation\b/gi, 'organization'],
  [/\borganising\b/gi, 'organizing'],
  [/\borganised\b/gi, 'organized'],
  [/\borganises\b/gi, 'organizes'],
  [/\borganise\b/gi, 'organize'],
  [/\bprioritising\b/gi, 'prioritizing'],
  [/\bprioritised\b/gi, 'prioritized'],
  [/\bprioritises\b/gi, 'prioritizes'],
  [/\bprioritise\b/gi, 'prioritize'],
  [/\boptimisation\b/gi, 'optimization'],
  [/\boptimising\b/gi, 'optimizing'],
  [/\boptimised\b/gi, 'optimized'],
  [/\boptimises\b/gi, 'optimizes'],
  [/\boptimise\b/gi, 'optimize'],
  [/\bfinalising\b/gi, 'finalizing'],
  [/\bfinalised\b/gi, 'finalized'],
  [/\bfinalise\b/gi, 'finalize'],
  [/\bprogrammes\b/gi, 'programs'],
  [/\bprogramme\b/gi, 'program'],
  [/\bjudgement\b/gi, 'judgment'],
  [/\bdecarbonisation\b/gi, 'decarbonization'],
  [/\bunderutilised\b/gi, 'underutilized'],
  [/\brecycling centers\b/gi, 'recycling centres'],
  [/\bdata centers\b/gi, 'data centres'],
  [/\bdata center\b/gi, 'data centre'],
  [/\bfitness centers\b/gi, 'fitness centres'],
  [/\bcentered\b/gi, 'centred'],
  [/\bcenter\b/gi, 'centre'],
  [/\bdefense\b/gi, 'defence'],
  [/\bcolor-tunable\b/gi, 'colour-tunable'],
  [/\bcolored\b/gi, 'coloured'],
  [/\bcolorizes\b/gi, 'colourizes'],
  [/\bcolors\b/gi, 'colours'],
  [/\btraveling\b/gi, 'travelling'],
  [/\bbehaviors\b/gi, 'behaviours'],
  [/\bbehavior\b/gi, 'behaviour'],
];

function collectFiles(target) {
  const absolute = path.join(root, target);
  if (fs.statSync(absolute).isFile()) return [absolute];
  const files = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const entryPath = path.join(absolute, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'ui') files.push(...collectFiles(path.relative(root, entryPath)));
    } else if (/\.(tsx?|txt)$/.test(entry.name)) {
      files.push(entryPath);
    }
  }
  return files;
}

let totalChanges = 0;
const changedFiles = [];

for (const target of targets) {
  for (const file of collectFiles(target)) {
    const original = fs.readFileSync(file, 'utf8');
    let content = original;
    for (const [term, token] of protectedTerms) content = content.replaceAll(term, token);
    for (const [pattern, replacement] of replacements) content = content.replace(pattern, replacement);
    for (const [term, token] of protectedTerms) content = content.replaceAll(token, term);
    if (content !== original) {
      const changes = [...original.matchAll(/\b(organis\w*|prioritis\w*|optimis\w*|finalis\w*|programme\w*|judgement|decarbonisation|underutilised|recycling centers|data centers?|fitness centers|centered|center|defense|color-tunable|colored|colorizes|colors|traveling|behaviors?)\b/gi)].length;
      fs.writeFileSync(file, content);
      totalChanges += changes;
      changedFiles.push(`${path.relative(root, file)} (${changes})`);
    }
  }
}

console.log(`Standardized ${totalChanges} public-copy variants across ${changedFiles.length} files.`);
for (const file of changedFiles) console.log(file);
