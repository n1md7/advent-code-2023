import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { Value } from '/src/utils/Value';

type Left = string;
type Right = string;
type Point = {
  L: Left;
  R: Right;
};

export class PartOne implements Solution<number> {
  private readonly instructions: string[];
  private readonly map = new Map<string, Point>();

  constructor(input: string) {
    const [head, , ...body] = input.split('\n');
    this.instructions = head.split('');
    body.forEach(this.parseLine.bind(this));
  }

  solve(): number {
    const steps = new Counter(0);
    const pointer = new Counter(0);
    const location = new Value('AAA');
    const limit = this.instructions.length;

    while (true) {
      steps.inc();

      const operation = this.instructions[pointer.val] as keyof Point;
      const point = this.map.get(location.val) as Point;
      const next = point[operation];

      if (next === 'ZZZ') return steps.val;

      location.set(next);
      pointer.set((pointer.val + 1) % limit);
    }
  }

  private parseLine(line: string): void {
    const [idx, points] = line.split(' = ');
    const match = points.match(/\w{3}/g);

    if (!match) throw new Error('Invalid input');

    const [left, right] = match;
    this.map.set(idx, { L: left, R: right });
  }
}
