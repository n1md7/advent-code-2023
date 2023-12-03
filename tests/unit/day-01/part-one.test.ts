import { PartOne } from '/src/day-01/part-one';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'process';

const path = cwd() + '/src/day-01/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

describe('Day 01 - Part 1', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(142);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(55002);
  });
});
