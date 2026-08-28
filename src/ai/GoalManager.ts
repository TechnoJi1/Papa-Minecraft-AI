export class GoalManager { private goal = 'idle safely'; set(goal: string): void { this.goal = goal; } get(): string { return this.goal; } }
