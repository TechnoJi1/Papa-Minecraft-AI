import type { PerceptionSnapshot } from '../perception/WorldScanner.js'; export class ContextBuilder { build(snapshot: PerceptionSnapshot): string { return JSON.stringify(snapshot); } }
