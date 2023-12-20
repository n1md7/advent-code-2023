export class Min {
  constructor(private value = Number.MAX_VALUE) {}

  get val(): number {
    return this.value;
  }

  compare(value: number): void {
    if (value < this.value) {
      this.value = value;
    }
  }
}
