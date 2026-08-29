export class Jump { private lastRunAt = 0; async run(): Promise<{ completedAt: number }> { this.lastRunAt = Date.now(); return { completedAt: this.lastRunAt }; } }
