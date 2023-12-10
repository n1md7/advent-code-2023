import { PartOne } from '/src/day-06/part-one';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-06/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
Time:      7  15   30
Distance:  9  40  200
`;

describe('Day 06 - Part 1', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(288);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(500346);
  });
});
