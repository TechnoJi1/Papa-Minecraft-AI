export class Timer { private started = Date.now(); reset(): void { this.started = Date.now(); } elapsed(): number { return Date.now() - this.started; } }
