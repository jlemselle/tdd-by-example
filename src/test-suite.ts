import { TestCase } from "./test-case";
import { TestResult } from "./test-result";

export class TestSuite {
  tests: TestCase[] = [];

  add(test: TestCase) {
    this.tests.push(test);
  }

  run(result: TestResult) {
    this.tests.forEach((test) => {
      result.testStarted();
      try {
        test.setUp();
        test.run();
      } catch (err) {
        result.testFailed();
      }
      test.tearDown();
    });
  }
}
