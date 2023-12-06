import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { PriorityQueue } from '@datastructures-js/priority-queue';

type Line = {
  winnerNums: Set<number>;
  playerNums: number[];
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
    const wins = new Map<number, number>();
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

      if (wins.has(copy.i)) {
        // Use cached value, no need to recalculate
        const count = new Counter(wins.get(copy.i) || 0);
        while (count.dec() >= 0) {
          const idx = copy.i + counter.inc();
          copies.enqueue({
            i: idx,
            line: lines[idx],
          });
        }

        continue;
      }

      for (const num of copy.line.playerNums) {
        if (copy.line.winnerNums.has(num)) {
          const idx = copy.i + counter.inc();
          const win = wins.get(copy.i) || 0;
          wins.set(copy.i, win + 1);
          copies.enqueue({
            i: idx,
            line: lines[idx],
          });
        }
      }
    }

    return total.val;
  }

  private parseLine(line: string): Line {
    const [_card, nums] = line.split(': ');
    const [winNums, myNums] = nums.split(' | ');

    return {
      winnerNums: new Set(winNums.split(' ').filter(Number).map(Number)),
      playerNums: myNums.split(' ').filter(Number).map(Number),
    };
  }
}
