import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { Value } from '/src/utils/Value';

export class PartOne implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    return this.input.reduce((sum, line) => {
      const differences = [line.split(' ').map(Number)];
      const step = new Counter(0);

      while (true) {
        const zeros = new Value(true);
        const difference: number[] = [];
        for (let i = 1; i < differences[step.val].length; i++) {
          const diff = differences[step.val][i] - differences[step.val][i - 1];
          difference.push(diff);
          if (diff !== 0) zeros.set(false);
        }
        differences.push(difference);
        if (zeros.val) {
          difference.push(0);
          break;
        }
        step.inc();
      }

      for (let i = differences.length - 2; i >= 0; i--) {
        const current = differences[i];
        const previous = differences[i + 1];
        const previousLast = previous[previous.length - 1];
        const currentLast = current[current.length - 1];

        current.push(previousLast + currentLast);
      }

      return sum + differences[0][differences[0].length - 1];
    }, 0);
  }
}
