import assert from "assert";
import { afterEach, beforeEach, describe, it } from "./public-api";
import { TestResult } from "./test-result";

export const testSuite = describe("test cases and suites", () => {
  let result: TestResult;

  beforeEach(() => {
    result = new TestResult();
  });

  it("should run proper lifecycle methods and report test", () => {
    let log = "";
    describe("", () => {
      beforeEach(() => {
        log += "beforeEach ";
      });
      it("testMethod", () => {
        log += "testMethod ";
      });
      afterEach(() => {
        log += "afterEach ";
      });
    }).run(result);
    assert("beforeEach testMethod afterEach " === log);
    assert("1 run, 0 failed" === result.summary());
  });

  it("should format failed result", () => {
    result.testStarted();
    result.testFailed();
    assert("1 run, 1 failed" === result.summary());
  });

  it("should report failed tests", () => {
    describe("", () => {
      it("testMethod", () => {
        throw new Error();
      });
    }).run(result);
    assert("1 run, 1 failed" === result.summary());
  });

  it("should report failed set up", () => {
    describe("", () => {
      beforeEach(() => {
        throw new Error();
      });
      it("testMethod", () => {});
    }).run(result);
    assert("1 run, 1 failed" === result.summary());
  });

  it("should report suite", () => {
    describe("", () => {
      it("testMethod", () => {});
      it("brokenTestMethod", () => {
        throw new Error();
      });
    }).run(result);
    assert("2 run, 1 failed" === result.summary());
  });
});
