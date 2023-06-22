export class TestResult {
  runCount = 0;
  errorCount = 0;

  testStarted() {
    this.runCount += 1;
  }

  testFailed() {
    this.errorCount += 1;
  }

  summary(): string {
    return `${this.runCount} run, ${this.errorCount} failed`;
  }
}
