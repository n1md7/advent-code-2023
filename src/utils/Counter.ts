export class Counter {
  private count: number = 0;

  constructor(value: number) {
    this.count = value;
  }

  get val() {
    return this.count;
  }

  inc() {
    return ++this.count;
  }

  dec() {
    return --this.count;
  }

  set(value: number) {
    this.count = value;
  }
}
