import type { Bot } from 'mineflayer';
import { goals } from 'mineflayer-pathfinder';
import type { Task } from '../task/Task.js';
import type { ActionResult } from './ActionResult.js';

export class ActionExecutor {
  constructor(private readonly bot: Bot) {}

  async execute(task: Task): Promise<ActionResult> {
    if (task.kind === 'say') {
      this.bot.chat(task.description);
      return { ok: true, message: 'Chat message sent' };
    }
    if (task.kind === 'move') {
      const { x, y, z } = task.payload ?? {};
      if (![x, y, z].every((value) => typeof value === 'number' && Number.isFinite(value))) {
        return { ok: false, message: 'Move task requires finite numeric x, y, and z coordinates' };
      }
      const target = { x, y, z } as { x: number; y: number; z: number };
      if (!Number.isInteger(target.x) || !Number.isInteger(target.y) || !Number.isInteger(target.z) ||
        Math.abs(target.x) > 29_999_984 || Math.abs(target.z) > 29_999_984 || target.y < -64 || target.y > 320) {
        return { ok: false, message: 'Move target is outside safe Minecraft coordinate bounds' };
      }
      try {
        this.bot.pathfinder.setGoal(new goals.GoalBlock(target.x, target.y, target.z));
        return { ok: true, message: `Navigating to ${target.x}, ${target.y}, ${target.z}` };
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'unknown pathfinder error';
        return { ok: false, message: `Unable to start navigation: ${reason}` };
      }
    }
    if (task.kind === 'stop') {
      this.bot.pathfinder.setGoal(null);
      return { ok: true, message: 'Navigation stopped' };
    }
    return { ok: false, message: `Unsupported task kind: ${task.kind}` };
  }
}
