import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';

export class PartTwo implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    const [first, second] = this.input;
    const time = parseInt(first.split(' ').map(Number).filter(Boolean).join(''));
    const target = parseInt(second.split(' ').map(Number).filter(Boolean).join(''));

    const count = new Counter(0);
    const speed = new Counter(0);
    const remaining = new Counter(time);
    while (speed.inc() < time) {
      remaining.dec();
      if (speed.val * remaining.val > target) {
        count.inc();
      }
    }

    return count.val;
  }
}
