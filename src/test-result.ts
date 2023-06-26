export class TestResult {
  runCount = 0;
  errorCount = 0;
  failedTests: string[] = [];

  testStarted() {
    this.runCount += 1;
  }

  testFailed(name: string) {
    this.errorCount += 1;
    this.failedTests.push(name);
  }

  summary(): string {
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}
