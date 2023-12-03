import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';
import { Item } from '/src/utils/Item';
import { Value } from '/src/utils/Value';

export class PartTwo implements Solution<number> {
  private readonly input: string[];
  private readonly forward: string[];
  private readonly backward: string[];
  private readonly map: Record<string, string>;

  constructor(input: string) {
    this.input = input.split('\n');

    this.forward = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    this.backward = this.forward.map(value => value.split('').reverse().join(''));

    this.map = this.forward.reduce(
      (acc, value, idx) => {
        acc[value] = String(idx + 1);
        acc[this.backward[idx]] = String(idx + 1);

        return acc;
      },
      {} as Record<string, string>,
    );
  }

  solve(): number {
    return this.input.reduce((total, line) => {
      const one = new Item<string>('', line.length);
      const two = new Item<string>('', -1);

      {
        const counter = new Counter(-1);
        while (counter.inc() < line.length) {
          const char = line[counter.val];
          if (this.isNumber(char)) {
            one.set(char, counter.val);
            break;
          }
        }

        const indices = this.forward
          .map(num => ({
            val: num,
            idx: line.indexOf(num),
          }))
          .filter(({ idx }) => idx !== -1);

        if (indices.length > 0) {
          const min = this.findMinByIndex(indices);
          if (min.idx < one.idx) {
            one.set(this.map[min.val], min.idx);
          }
        }
      }

      {
        const counter = new Counter(line.length);
        while (counter.dec() >= 0) {
          const char = line[counter.val];
          if (this.isNumber(char)) {
            two.set(char, counter.val);
            break;
          }
        }

        const indices = this.forward
          .map(num => ({
            val: num,
            idx: line.lastIndexOf(num),
          }))
          .filter(({ idx }) => idx !== -1);

        if (indices.length > 0) {
          const max = this.findMaxByIndex(indices);
          if (max.idx > two.idx) {
            two.set(this.map[max.val], max.idx);
          }
        }
      }

      return total + +(one.val + two.val);
    }, 0);
  }

  private isNumber(value: string): boolean {
    return !isNaN(Number(value));
  }

  private findMinByIndex(indices: { val: string; idx: number }[]) {
    const minIdx = new Value<number>(Number.MAX_SAFE_INTEGER);
    const minVal = new Value<string>('');
    for (const { val, idx } of indices) {
      if (idx < minIdx.val) {
        minIdx.set(idx);
        minVal.set(val);
      }
    }

    return {
      idx: minIdx.val,
      val: minVal.val,
    };
  }

  private findMaxByIndex(indices: { val: string; idx: number }[]) {
    const maxIdx = new Value<number>(Number.MIN_SAFE_INTEGER);
    const maxVal = new Value<string>('');
    for (const { val, idx } of indices) {
      if (idx > maxIdx.val) {
        maxIdx.set(idx);
        maxVal.set(val);
      }
    }

    return {
      idx: maxIdx.val,
      val: maxVal.val,
    };
  }
}
