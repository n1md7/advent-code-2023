import { Solution } from '/src/interfaces/solution';
import { Max } from '/src/utils/Max';

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

type StackItem = {
  row: number;
  col: number;
  direction: Direction;
};

export class PartTwo implements Solution<number> {
  private readonly input: string[][];

  constructor(input: string) {
    this.input = input.split('\n').map(row => {
      return row.split('');
    });
  }

  solve(): number {
    const max = new Max();
    const topRow = this.input[0].map((_, col) => ({ row: 0, col, direction: Direction.DOWN }));
    const bottomRow = this.input[this.input.length - 1].map((_, col) => ({
      col,
      row: this.input.length - 1,
      direction: Direction.UP,
    }));
    const firstCol = this.input.map(rows => rows[0]).map((_, row) => ({ row, col: 0, direction: Direction.RIGHT }));
    const lastCol = this.input
      .map(rows => rows[rows.length - 1])
      .map((_, row) => ({ row, col: this.input.length - 1, direction: Direction.LEFT }));

    for (const start of [...topRow, ...bottomRow, ...firstCol, ...lastCol]) {
      max.compare(this.findEnergizedBeams(start));
    }

    return max.val;
  }

  private findEnergizedBeams(start: StackItem): number {
    const stack = [
      {
        row: start.row,
        col: start.col,
        direction: start.direction,
      },
    ];
    const energized = new Set<string>();
    const beams = new Set<`${number}:${number}:${Direction}`>();

    while (stack.length) {
      const { row, col, direction } = stack.pop()!;

      const key = `${row}:${col}:${direction}` as const;
      if (beams.has(key)) continue; // Guard against infinite loop
      beams.add(key);

      energized.add(`${row}:${col}`);

      const item = this.input[row][col];

      if (item === '.') {
        if (direction === Direction.RIGHT) {
          const right = this.input[row][col + 1];
          if (!right) continue;

          stack.push({ row, col: col + 1, direction: Direction.RIGHT });
        } else if (direction === Direction.LEFT) {
          const left = this.input[row][col - 1];
          if (!left) continue;

          stack.push({ row, col: col - 1, direction: Direction.LEFT });
        } else if (direction === Direction.UP) {
          const up = this.input[row - 1]?.[col];
          if (!up) continue;

          stack.push({ row: row - 1, col, direction: Direction.UP });
        } else if (direction === Direction.DOWN) {
          const down = this.input[row + 1]?.[col];
          if (!down) continue;

          stack.push({ row: row + 1, col, direction: Direction.DOWN });
        }
      } else if (['|', '-'].includes(item)) {
        if (item === '|') {
          const up = this.input[row - 1]?.[col];
          if (up) stack.push({ row: row - 1, col, direction: Direction.UP });
          const down = this.input[row + 1]?.[col];
          if (down) stack.push({ row: row + 1, col, direction: Direction.DOWN });
        } else if (item === '-') {
          const left = this.input[row][col - 1];
          if (left) stack.push({ row, col: col - 1, direction: Direction.LEFT });
          const right = this.input[row][col + 1];
          if (right) stack.push({ row, col: col + 1, direction: Direction.RIGHT });
        }
      } else if (['/', '\\'].includes(item)) {
        if (item === '/') {
          if (direction === Direction.UP) {
            const right = this.input[row][col + 1];
            if (right) stack.push({ row, col: col + 1, direction: Direction.RIGHT });
          } else if (direction === Direction.RIGHT) {
            const up = this.input[row - 1]?.[col];
            if (up) stack.push({ row: row - 1, col, direction: Direction.UP });
          } else if (direction === Direction.DOWN) {
            const left = this.input[row][col - 1];
            if (left) stack.push({ row, col: col - 1, direction: Direction.LEFT });
          } else if (direction === Direction.LEFT) {
            const down = this.input[row + 1]?.[col];
            if (down) stack.push({ row: row + 1, col, direction: Direction.DOWN });
          }
        } else if (item === '\\') {
          if (direction === Direction.UP) {
            const left = this.input[row][col - 1];
            if (left) stack.push({ row, col: col - 1, direction: Direction.LEFT });
          } else if (direction === Direction.RIGHT) {
            const down = this.input[row + 1]?.[col];
            if (down) stack.push({ row: row + 1, col, direction: Direction.DOWN });
          } else if (direction === Direction.DOWN) {
            const right = this.input[row][col + 1];
            if (right) stack.push({ row, col: col + 1, direction: Direction.RIGHT });
          } else if (direction === Direction.LEFT) {
            const up = this.input[row - 1]?.[col];
            if (up) stack.push({ row: row - 1, col, direction: Direction.UP });
          }
        }
      }
    }

    return energized.size;
  }
}
