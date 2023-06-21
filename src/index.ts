class WasRun {
  wasRun: boolean | null = null;
  constructor(private name: keyof WasRun) {}
  testMethod() {
    this.wasRun = true;
  }
  run() {
    const method = this[this.name] as () => void;
    method.call(this);
  }
}

const test = new WasRun("testMethod");
console.log(test.wasRun);
test.run();
console.log(test.wasRun);
