import { PartTwo } from '/src/day-06/part-two';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-06/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
Time:      7  15   30
Distance:  9  40  200
`;

describe('Day 06 - Part 2', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(71503);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(42515755);
  });
});
