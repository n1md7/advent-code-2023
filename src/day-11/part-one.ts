import { Solution } from '/src/interfaces/solution';
import { Counter } from '/src/utils/Counter';

enum Type {
  Galaxy = '#',
  Space = '.',
}
export class PartOne implements Solution<number> {
  private readonly cluster: Vector[][];
  private readonly galaxies: Vector[];
  private readonly expandedRows: number[];
  private readonly expandedCols: number[];

  constructor(input: string) {
    this.galaxies = [];
    this.expandedCols = [];
    this.expandedRows = [];
    this.cluster = input.split('\n').map((row, y) => {
      return row.split('').map((col, x) => {
        const point = Vector.from(y, x, col as Type);
        if (col === Type.Galaxy) this.galaxies.push(point);
        return point;
      });
    });

    this.cluster.forEach((row, rowIndex) => {
      if (row.every(col => col.isSpace())) {
        this.expandedCols.push(rowIndex);
      }
    });
    for (let i = 0; i < this.cluster[0].length; i++) {
      if (this.cluster.every(row => row[i].isSpace())) {
        this.expandedRows.push(i);
      }
    }
  }

  solve(): number {
    const sum = new Counter(0);
    const size = this.galaxies.length;
    for (let y = 0; y < size; y++) {
      for (let x = y + 1; x < size; x++) {
        const a = this.galaxies[y];
        const b = this.galaxies[x];
        sum.add(a.distanceTo(b, this.expandedRows, this.expandedCols));
      }
    }

    return sum.val;
  }
}

class Vector {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: Type,
  ) {}

  isGalaxy(): boolean {
    return this.type === Type.Galaxy;
  }

  isSpace(): boolean {
    return this.type === Type.Space;
  }

  distanceTo(vector: Vector, expandedRows: number[], expandedCols: number[]): number {
    const xMin = Math.min(this.x, vector.x);
    const xMax = Math.max(this.x, vector.x);
    const yMin = Math.min(this.y, vector.y);
    const yMax = Math.max(this.y, vector.y);

    const rowExpansionCount = expandedRows.filter(row => row > xMin && row < xMax).length;
    const columnExpansionCount = expandedCols.filter(col => col > yMin && col < yMax).length;

    return yMax - yMin + (xMax - xMin) + rowExpansionCount + columnExpansionCount;
  }

  static from(y: number, x: number, type: Type): Vector {
    return new Vector(x, y, type);
  }
}
