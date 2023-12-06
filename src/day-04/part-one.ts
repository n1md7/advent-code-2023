import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';

export class PartOne implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    return this.input.reduce((total, line) => {
      const counter = new Counter(0);
      const { winNums, myNums } = this.parseLine(line);

      for (const num of myNums) {
        if (winNums.has(num)) {
          if (counter.val === 0) {
            counter.set(1);
            continue;
          }

          counter.set(counter.val * 2);
        }
      }

      return total + counter.val;
    }, 0);
  }

  private parseLine(line: string) {
    const [_card, nums] = line.split(': ');
    const [winNums, myNums] = nums.split(' | ');

    return {
      winNums: new Set(winNums.split(' ').filter(Number).map(Number)),
      myNums: myNums.split(' ').filter(Number).map(Number),
    };
  }
}
