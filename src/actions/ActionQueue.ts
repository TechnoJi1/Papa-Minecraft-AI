export class ActionQueue<T> { private readonly actions: T[] = []; push(action: T): void { this.actions.push(action); } take(): T | undefined { return this.actions.shift(); } }
