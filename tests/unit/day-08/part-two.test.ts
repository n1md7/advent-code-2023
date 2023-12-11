import { PartTwo } from '/src/day-08/part-two';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-08/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

describe('Day 08 - Part 2', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(6);
  });

  it.skip('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(100);
  });
});
