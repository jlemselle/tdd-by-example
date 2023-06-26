import { testSuite } from "./test-case.test";
import { TestResult } from "./test-result";

const result = new TestResult();
testSuite.run(result);
console.log(result.summary());
