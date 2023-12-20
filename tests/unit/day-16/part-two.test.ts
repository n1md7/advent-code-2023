import { PartTwo } from '/src/day-16/part-two';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-16/input.txt';
const input = readFileSync(path, 'utf-8');
const example = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....
`;

describe('Day 16 - Part 2', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(51);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartTwo(payload);

    const result = partOne.solve();

    expect(result).toBe(8444);
  });
});
