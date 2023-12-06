import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { PriorityQueue } from '@datastructures-js/priority-queue';

type Line = {
  winNums: Set<number>;
  myNums: number[];
};
type Match = {
  i: number;
  line: Line;
};

export class PartTwo implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    const lines: Line[] = [];
    const total = new Counter(0);
    const copies = new PriorityQueue<Match>((a, b) => {
      if (a.i > b.i) return +1;
      if (a.i < b.i) return -1;

      return 0;
    });

    for (const [i, text] of this.input.entries()) {
      const line = this.parseLine(text);
      copies.enqueue({ i, line });
      lines.push(line);
    }

    while (copies.size()) {
      total.inc();

      const counter = new Counter(0);
      const copy = copies.pop();

      for (const num of copy.line.myNums) {
        if (copy.line.winNums.has(num)) {
          const idx = copy.i + counter.inc();
          copies.enqueue({
            i: idx,
            line: lines[idx],
          });
        }
      }
    }

    return total.val;
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
