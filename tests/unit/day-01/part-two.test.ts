import { PartTwo } from '/src/day-01/part-two';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'process';

const path = cwd() + '/src/day-01/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

describe('Day 02 - Part 1', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(281);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(55093);
  });
});
