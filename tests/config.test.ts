import { describe, it, expect } from 'vitest';
import { parseNumber } from '@/config';

describe('config.parseNumber', () => {
  it('parses valid positive numbers', () => {
    expect(parseNumber('123', 0)).toBe(123);
  });
  it('falls back on invalid values', () => {
    expect(parseNumber('not-a-number', 42)).toBe(42);
    expect(parseNumber(undefined, 7)).toBe(7);
    expect(parseNumber('-5', 10)).toBe(10);
  });
});

