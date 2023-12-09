import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { Value } from '/src/utils/Value';

export class PartTwo implements Solution<number> {
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
          difference.unshift(0); // Add 0 to the beginning
          break;
        }
        step.inc();
      }

      for (let i = differences.length - 2; i >= 0; i--) {
        const { 0: current } = differences[i];
        const { 0: previous } = differences[i + 1];
        differences[i].unshift(current - previous); // Add the difference to the beginning
      }

      return sum + differences[0][0]; // Very 1st element in 2d array
    }, 0);
  }
}
