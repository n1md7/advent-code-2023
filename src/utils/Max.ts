export class Max {
  constructor(private value = Number.MIN_VALUE) {}

  get val(): number {
    return this.value;
  }

  compare(value: number): void {
    if (value > this.value) {
      this.value = value;
    }
  }
}
