import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';

type Left = string;
type Right = string;
type Point = {
  L: Left;
  R: Right;
};

export class PartTwo implements Solution<number> {
  private readonly instructions: string[];
  private readonly map = new Map<string, Point>();
  private readonly points: string[] = [];

  constructor(input: string) {
    const [head, , ...body] = input.split('\n');
    this.instructions = head.split('');
    body.forEach(this.parseLine.bind(this));
  }

  solve(): number {
    const steps = new Counter(0);
    const pointer = new Counter(0);
    const limit = this.instructions.length;

    while (true) {
      steps.inc();

      for (const [idx, location] of this.points.entries()) {
        const operation = this.instructions[pointer.val] as keyof Point;
        const point = this.map.get(location) as Point;

        this.points[idx] = point[operation];
      }

      if (this.points.every(key => key.endsWith('Z'))) return steps.val;

      pointer.set((pointer.val + 1) % limit);
    }
  }

  private parseLine(line: string): void {
    const [idx, points] = line.split(' = ');
    const match = points.match(/\w{3}/g);

    if (!match) throw new Error('Invalid input');

    const [left, right] = match;
    if (idx.endsWith('A')) this.points.push(idx);
    this.map.set(idx, { L: left, R: right });
  }
}
