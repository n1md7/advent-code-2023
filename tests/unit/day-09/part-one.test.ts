import { PartOne } from '/src/day-09/part-one';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-09/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

describe('Day 09 - Part 1', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(114);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(1842168671);
  });
});
