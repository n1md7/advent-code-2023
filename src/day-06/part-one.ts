import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';

export class PartOne implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    const [first, second] = this.input;
    const times = first.split(' ').map(Number).filter(Boolean);
    const distances = second.split(' ').map(Number).filter(Boolean);
    const total = new Counter(1);

    for (const [idx, time] of times.entries()) {
      const count = new Counter(0);
      const speed = new Counter(0);
      const remaining = new Counter(time);
      const target = distances[idx];
      while (speed.inc() < time) {
        remaining.dec();
        if (speed.val * remaining.val > target) {
          count.inc();
        }
      }

      total.mul(count.val);
    }

    return total.val;
  }
}
