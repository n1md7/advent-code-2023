import { Solution } from '/src/interfaces/solution';
import { Value } from '/src/utils/Value';

export class PartOne implements Solution<number> {
  private readonly titles = new Set([
    'seed-to-soil map:',
    'soil-to-fertilizer map:',
    'fertilizer-to-water map:',
    'water-to-light map:',
    'light-to-temperature map:',
    'temperature-to-humidity map:',
    'humidity-to-location map:',
  ]);
  private readonly seeds: Set<number>;
  private readonly maps: Map<string, [number, number, number][]>;

  constructor(text: string) {
    const input = text.split('\n');
    const title = new Value('');

    this.seeds = new Set(input.shift()!.split(' ').map(Number).filter(Boolean));
    this.maps = new Map();

    while (input.length > 0) {
      const line = input.shift();

      if (!line) continue;

      if (this.titles.has(line)) {
        this.maps.set(line, []);
        title.set(line);
      } else {
        const [dest, src, value] = line.split(' ').map(Number);
        this.maps.set(title.val, [...this.maps.get(title.val)!, [dest, src, value]]);
      }
    }
  }

  solve(): number {
    const min = new Value(+Infinity);

    for (const seed of this.seeds) {
      const target = new Value(seed);
      for (const map of this.maps.values()) {
        for (const [dest, src, len] of map) {
          // When it's in the range, we can calculate the next value
          if (target.val >= src && target.val < src + len) {
            target.set(dest + target.val - src);
            break;
          }
        }
      }
      min.set(Math.min(min.val, target.val));
    }

    return min.valueOf();
  }
}
