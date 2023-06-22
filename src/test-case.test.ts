import assert from "assert";
import { TestCase } from "./test-case";
import { TestResult } from "./test-result";
import { TestSuite } from "./test-suite";

export class TestCaseTest extends TestCase {
  result: TestResult = new TestResult();

  override setUp() {
    this.result = new TestResult();
  }

  testTemplateMethod() {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert("setUp testMethod tearDown " === test.log);
  }

  testResult() {
    const test = new WasRun("testMethod");
    test.run(this.result);
    assert("1 run, 0 failed" === this.result.summary());
  }

  testFailedResultFormatting() {
    this.result.testStarted();
    this.result.testFailed();
    assert("1 run, 1 failed" === this.result.summary());
  }

  testFailedResult() {
    const test = new WasRun("testBrokenMethod");
    test.run(this.result);
    assert("1 run, 1 failed" === this.result.summary());
  }

  testFailedSetUpResult() {
    const test = new BrokenSetUp("testMethod");
    test.run(this.result);
    assert("1 run, 1 failed" === this.result.summary());
  }

  testSuite() {
    const suite = new TestSuite();
    suite.add(new WasRun("testMethod"));
    suite.add(new WasRun("testBrokenMethod"));
    const result = new TestResult();
    suite.run(result);
    assert("2 run, 1 failed" === result.summary());
  }
}

export class WasRun extends TestCase {
  log = "";

  constructor(name: string) {
    super(name);
  }

  override setUp() {
    this.log += "setUp ";
  }

  testMethod() {
    this.log += "testMethod ";
  }

  testBrokenMethod() {
    throw new Error();
  }

  override tearDown() {
    this.log += "tearDown ";
  }
}

export class BrokenSetUp extends TestCase {
  constructor(name: string) {
    super(name);
  }

  override setUp() {
    throw new Error();
  }

  testFailedSetUp() {}
}
