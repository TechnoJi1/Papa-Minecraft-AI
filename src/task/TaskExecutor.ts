import type { Task } from './Task.js';
export type TaskHandler = (task: Task) => Promise<void>;
export class TaskExecutor { constructor(private readonly handler: TaskHandler) {} execute(task: Task): Promise<void> { return this.handler(task); } }
