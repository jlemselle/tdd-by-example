class WasRun {
  wasRun: boolean | null = null;
  constructor(name: string) {}
  testMethod() {
    this.wasRun = true;
  }
}

const test = new WasRun("testMethod");
console.log(test.wasRun);
test.testMethod();
console.log(test.wasRun);
