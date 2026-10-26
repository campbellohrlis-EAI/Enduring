import { describe, expect, it } from 'vitest';
import { isActioWordmarkToken, normaliseActioWordmark, splitActioWordmarkText } from './actioWordmark';

describe('actio wordmark matcher', () => {
  it('finds each standalone wordmark while preserving surrounding copy', () => {
    expect(splitActioWordmarkText('actio screens the field. ACTIO then helps again.')).toEqual([
      '',
      'actio',
      ' screens the field. ',
      'ACTIO',
      ' then helps again.',
    ]);
  });

  it('does not confuse longer words with the standalone wordmark', () => {
    expect(splitActioWordmarkText('action /actio-platform proactio')).toEqual([
      'action /',
      'actio',
      '-platform proactio',
    ]);
  });

  it('identifies only the lower-case brand token case-insensitively', () => {
    expect(isActioWordmarkToken('actio')).toBe(true);
    expect(isActioWordmarkToken('ACTIO')).toBe(true);
    expect(isActioWordmarkToken('action')).toBe(false);
    expect(isActioWordmarkToken('actio-platform')).toBe(false);
  });

  it('always normalizes the standalone wordmark to lower case', () => {
    expect(normaliseActioWordmark('ACTIO')).toBe('actio');
    expect(normaliseActioWordmark('Actio')).toBe('actio');
    expect(normaliseActioWordmark('actio')).toBe('actio');
    expect(normaliseActioWordmark('action')).toBe('action');
  });
});
