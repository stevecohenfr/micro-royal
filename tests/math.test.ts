import { describe, it, expect } from 'vitest';
import { add } from '@/utils/math';

describe('math.add', () => {
  it('adds positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('adds negatives and zeros', () => {
    expect(add(-2, 0)).toBe(-2);
    expect(add(-2, -3)).toBe(-5);
  });
});

