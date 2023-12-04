import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { Value } from '/src/utils/Value';

export class PartOne implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    return this.input.reduce((total, line, lineIdx) => {
      const nums: string[] = [];
      const sum = new Counter(0);
      const isPart = new Value(false);
      const charIdx = new Counter(-1);
      for (const char of line) {
        charIdx.inc();

        if (this.isNumber(char)) {
          nums.push(char);

          if (this.hasSymbol(lineIdx, charIdx.val)) {
            isPart.set(true);
          }

          continue;
        }

        // Evaluate the number
        if (nums.length && isPart.val) {
          sum.add(+nums.join(''));
        }

        // Reset and clear
        isPart.set(false);
        nums.length = 0;
      }

      return total + sum.val;
    }, 0);
  }

  private isNumber(value: string): boolean {
    return /\d/.test(value);
  }

  private isSymbol(value: string): boolean {
    return /[^0-9.]/.test(value);
  }

  private hasSymbol(lineIdx: number, charIdx: number): boolean {
    const dirs = [
      [-1, 0], // Top
      [1, 0], // Bottom
      [0, -1], // Left
      [0, 1], // Right
      [-1, -1], // Top Left
      [-1, 1], // Top Right
      [1, -1], // Bottom Left
      [1, 1], // Bottom Right
    ];

    for (const [y, x] of dirs) {
      const char = this.input[lineIdx + y]?.[charIdx + x];
      if (!char) continue;
      if (this.isSymbol(char)) return true;
    }

    return false;
  }
}
