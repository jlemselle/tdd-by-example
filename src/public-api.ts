import { TestCase } from "./test-case";
import { TestSuite } from "./test-suite";

type BeforeEachFn = () => void;
type TestFn = () => void;
type AfterEachFn = () => void;

let beforeEachFn: BeforeEachFn = () => {};
let testCollection: TestCase[] = [];
let afterEachFn: AfterEachFn = () => {};

export function describe(name: string, suiteFn: () => void): TestSuite {
  beforeEach = [];
  testCollection = [];
  afterEach = [];
  suiteFn();
  const suite = new TestSuite();
  for (const test of testCollection) {
    suite.add(test);
  }
  return suite;
}

export function beforeEach(beforeEachFn: BeforeEachFn) {
  beforeEachCollection.push(beforeEachFn);
}

export function it(name: string, testFn: TestFn): TestCase {
  const testCase = {
    name,
    setUp: () => {
      for (const beforeEachFn of beforeEachCollection) {
        beforeEachFn();
      }
    },
    run: testFn,
    tearDown: () => {
      for (const afterEachFn of afterEachCollection) {
        afterEachFn();
      }
    },
  };
  testCollection.push(testCase);
  return testCase;
}

export function afterEach(afterEachFn: AfterEachFn) {
  afterEachCollection.push(afterEachFn);
}
