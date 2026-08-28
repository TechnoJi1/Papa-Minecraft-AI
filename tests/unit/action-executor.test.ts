import { describe, expect, it, vi } from 'vitest';
import { ActionExecutor } from '../../src/actions/ActionExecutor.js';
import { createTask } from '../../src/task/Task.js';

describe('ActionExecutor', () => {
  it('sends a chat task through the Mineflayer bot', async () => {
    const chat = vi.fn();
    const executor = new ActionExecutor({ chat, pathfinder: { setGoal: vi.fn() } } as never);
    await expect(executor.execute(createTask('say', 'hello'))).resolves.toEqual({ ok: true, message: 'Chat message sent' });
    expect(chat).toHaveBeenCalledWith('hello');
  });

  it('rejects unsafe coordinates and stops idempotently', async () => {
    const setGoal = vi.fn();
    const executor = new ActionExecutor({ chat: vi.fn(), pathfinder: { setGoal } } as never);
    await expect(executor.execute(createTask('move', 'bad', 50, { x: Infinity, y: 64, z: 0 }))).resolves.toMatchObject({ ok: false });
    await expect(executor.execute(createTask('stop', 'stop'))).resolves.toEqual({ ok: true, message: 'Navigation stopped' });
    expect(setGoal).toHaveBeenCalledWith(null);
  });
});
