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

  add(value: number) {
    this.count += value;
  }

  sub(value: number) {
    this.count -= value;
  }

  set(value: number) {
    this.count = value;
  }
}
