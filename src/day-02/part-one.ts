import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';

export class PartOne implements Solution<number> {
  private readonly input: string[];
  private readonly limit: Record<string, number>;

  constructor(input: string) {
    this.input = input.split('\n');
    this.limit = Object.freeze({
      red: 12,
      green: 13,
      blue: 14,
    });
  }

  solve(): number {
    return this.input.reduce((total, line) => {
      const game = this.extract(line);

      for (const cubes of game.operations) {
        const red = new Counter(0);
        const green = new Counter(0);
        const blue = new Counter(0);
        for (const cube of cubes) {
          const { color, count } = cube;

          if (color === 'red') red.add(+count);
          if (color === 'green') green.add(+count);
          if (color === 'blue') blue.add(+count);
        }

        if (red.val > this.limit.red) return total;
        if (green.val > this.limit.green) return total;
        if (blue.val > this.limit.blue) return total;
      }

      return total + +game.id;
    }, 0);
  }

  private extract(line: string) {
    const [game, picks] = line.split(': ');
    const [, id] = game.split('Game ');

    const operations = picks.split('; ').map(operation => {
      return operation.split(', ').map(cube => {
        const [count, color] = cube.split(' ');
        return { count, color };
      });
    });

    return { id, operations };
  }
}
