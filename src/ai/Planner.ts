import { createTask, type Task } from '../task/Task.js'; export class Planner { plan(goal: string): Task[] { return [createTask('goal', goal, 50)]; } }
