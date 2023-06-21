import assert from "assert";

class TestCase {
  constructor(protected name: string) {}

  run() {
    const method = this[this.name as keyof TestCase] as () => void;
    method.call(this);
  }
}

class WasRun extends TestCase {
  wasRun: boolean | null = null;
  constructor(name: string) {
    super(name);
  }
  testMethod() {
    this.wasRun = true;
  }
}

class TestCaseTest extends TestCase {
  testRunning() {
    const test = new WasRun("testMethod");
    assert(!test.wasRun);
    test.run();
    assert(test.wasRun);
  }
}

new TestCaseTest("testRunning").run();
