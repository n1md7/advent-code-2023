import { PartOne } from '/src/day-08/part-one';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-08/input.txt';
const input = readFileSync(path, 'utf-8');
const example01 = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;
const example02 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

describe('Day 08 - Part 1', () => {
  it('should verify example01 input', () => {
    const payload = example01.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(2);
  });

  it('should verify example02 input', () => {
    const payload = example02.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(6);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new PartOne(payload);

    const result = partOne.solve();

    expect(result).toBe(14681);
  });
});
