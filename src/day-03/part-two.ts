
import { Solution } from '/src/interfaces/solution';

export class PartTwo implements Solution<number> {
  private readonly input: string[];

  constructor(input: string) {
    this.input = input.split('\n');
  }

  solve(): number {
    return 0;
  }
}

