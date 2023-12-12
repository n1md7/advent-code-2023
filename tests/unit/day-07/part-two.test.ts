import { PartTwo } from '/src/day-07/part-two';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-07/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

describe('Day 07 - Part 2', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(5905);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(249356515);
  });
});
