import { itWorks } from '/src/index';
import { describe, expect, it } from 'vitest';

describe('It works', () => {
  it('should return text', () => {
    const expected = 'It works!';

    const result = itWorks();

    expect(result).toBe(expected);
  });
});
