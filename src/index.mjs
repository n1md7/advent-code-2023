#!/usr/bin/env node

import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {argv, cwd, exit} from 'node:process';

const args = argv.slice(2);
const params = {day: ''};

while (args.length > 0) {
  const key = args.shift();
  if (key === '--day') {
    const val = args.shift();
    if (val) params.day = val.padStart(2, '0');
  }
}

if (!params.day) {
  console.error('Missing day param');
  exit(1);
}

const createFolder = (dir) => {
  dir = cwd() + '/' + dir;
  if (!existsSync(dir)) mkdirSync(dir)
};
const createFile = (path, content) => {
  path = cwd() + '/' + path;
  if (!existsSync(path)) writeFileSync(path, content);
}

const unitTestTemplate = (day, part) => `
import { Part${part === 1 ? 'One' : 'Two'} } from '/src/day-${day}/part-${part === 1 ? 'one' : 'two'}';
import { expect, it, describe } from 'vitest';
import { readFileSync } from 'fs';
import { cwd } from 'node:process';

const path = cwd() + '/src/day-${day}/input.txt';
const input = readFileSync(path, 'utf-8');
const example = \`aa.bb.cc\`;

describe.skip('Day ${day} - Part ${part}', () => {
  it('should verify example input', () => {
    const payload = example.trim();
    const partOne = new Part${part === 1 ? 'One' : 'Two'}(payload);

    const result = partOne.solve();

    expect(result).toBe(0);
  });

  it('should verify real input', () => {
    const payload = input.trim();
    const partOne = new Part${part === 1 ? 'One' : 'Two'}(payload);

    const result = partOne.solve();

    expect(result).toBe(100);
  });
});

`;

const solutionTemplate = (part) => `
import { Solution } from '/src/interfaces/solution';

export class Part${part} implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\\n');
  }

  solve(): number {
    return 0;
  }
}

`

try {
  createFolder(`src/day-${params.day}`);

  createFile(`src/day-${params.day}/input.txt`, 'Paste your input here');
  createFile(`src/day-${params.day}/part-one.ts`, solutionTemplate('One', 1));
  createFile(`src/day-${params.day}/part-two.ts`, solutionTemplate('Two', 2));

  createFolder(`tests/unit/day-${params.day}`);
  createFile(`tests/unit/day-${params.day}/part-one.test.ts`, unitTestTemplate(params.day, 1));
  createFile(`tests/unit/day-${params.day}/part-two.test.ts`, unitTestTemplate(params.day, 2));
} catch (e) {
  console.error(e);
  exit(1);
}

console.log(`Day ${params.day} created!`);

exit(0);
