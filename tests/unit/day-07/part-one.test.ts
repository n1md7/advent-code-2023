import { PartOne } from '/src/day-07/part-one';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-07/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

describe('Day 07 - Part 1', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(6440);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(246795406);
  });
});
