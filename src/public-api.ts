import { TestSuite } from "./test-suite";

type BeforeEachFn = () => void;
type TestFn = () => void;
type AfterEachFn = () => void;

interface TestDefinnition {
  name: string;
  testFn: TestFn;
}

let registeredBeforeEachFn: BeforeEachFn = () => {};
let registeredTests: TestDefinnition[] = [];
let registeredAfterEachFn: AfterEachFn = () => {};

export function describe(name: string, suiteFn: () => void): TestSuite {
  registeredBeforeEachFn = () => {};
  registeredTests = [];
  registeredAfterEachFn = () => {};
  suiteFn();
  const suite = new TestSuite();
  for (const test of registeredTests) {
    suite.add({
      name: test.name,
      setUp: registeredBeforeEachFn,
      run: test.testFn,
      tearDown: registeredAfterEachFn,
    });
  }
  return suite;
}

export function beforeEach(beforeEachFn: BeforeEachFn) {
  registeredBeforeEachFn = beforeEachFn;
}

export function it(name: string, testFn: TestFn) {
  registeredTests.push({ name, testFn });
}

export function afterEach(afterEachFn: AfterEachFn) {
  registeredAfterEachFn = afterEachFn;
}
