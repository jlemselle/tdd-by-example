import { TestResult } from "./test-result";

export class TestCase {
  constructor(protected name: string) {}

  setUp() {}
  tearDown() {}

  run(result: TestResult) {
    result.testStarted();
    try {
      this.setUp();
      const method = this[this.name as keyof TestCase] as () => void;
      method.call(this);
    } catch (err) {
      result.testFailed();
    }
    this.tearDown();
  }
}
