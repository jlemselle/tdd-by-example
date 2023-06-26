export interface TestCase {
  name: string;
  setUp: () => void;
  tearDown: () => void;
  run: () => void;
}
