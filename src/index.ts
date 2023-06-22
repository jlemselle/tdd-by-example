import { TestCaseTest } from "./test-case.test";
import { TestResult } from "./test-result";
import { TestSuite } from "./test-suite";

const suite = new TestSuite();
suite.add(new TestCaseTest("testTemplateMethod"));
suite.add(new TestCaseTest("testResult"));
suite.add(new TestCaseTest("testFailedResultFormatting"));
suite.add(new TestCaseTest("testFailedResult"));
suite.add(new TestCaseTest("testFailedSetUpResult"));
suite.add(new TestCaseTest("testSuite"));
const result = new TestResult();
suite.run(result);
console.log(result.summary());
