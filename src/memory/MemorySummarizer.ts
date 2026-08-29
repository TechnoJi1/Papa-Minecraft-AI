export class MemorySummarizer { summarize(entries: readonly string[]): string { return entries.slice(-10).join('; '); } }
