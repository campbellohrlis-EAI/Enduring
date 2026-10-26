const ACTIO_SPLIT_PATTERN = /(\bactio\b)/gi;

export function splitActioWordmarkText(copy: string) {
  return copy.split(ACTIO_SPLIT_PATTERN);
}

export function isActioWordmarkToken(part: string) {
  return part.toLowerCase() === 'actio';
}

export function normaliseActioWordmark(part: string) {
  return isActioWordmarkToken(part) ? 'actio' : part;
}
