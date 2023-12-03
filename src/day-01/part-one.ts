import { Counter } from '/src/day-01/Counter';
import { Solution } from '/src/interfaces/solution';

export class PartOne implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    return this.input.reduce((total, line) => {
      const values = {
        one: '',
        two: '',
        sum: () => +(values.one + values.two),
      };

      for (const char of line) {
        if (this.isNumber(char)) {
          values.one = char;
          break;
        }
      }

      const idx = new Counter(line.length);
      while (idx.dec() >= 0) {
        const char = line[idx.val];
        if (this.isNumber(char)) {
          values.two = char;
          break;
        }
      }

      return total + values.sum();
    }, 0);
  }

  private isNumber(value: string): boolean {
    return !isNaN(Number(value));
  }
}
