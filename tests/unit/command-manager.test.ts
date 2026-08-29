import { describe, expect, it } from 'vitest';
import type { ModelClient } from '../../src/ai/GeminiClient.js';
import { CommandManager } from '../../src/commands/CommandManager.js';
import { CommandRegistry } from '../../src/commands/CommandRegistry.js';
import { PermissionManager } from '../../src/commands/PermissionManager.js';

class FixedModel implements ModelClient {
  async generate(): Promise<string> { return '{"intent":"move","argument":"10 64 -3","confidence":0.9}'; }
}

describe('CommandManager', () => {
  it('routes an owner English message through the model and registry', async () => {
    const registry = new CommandRegistry();
    let received = '';
    registry.register('move', async (argument) => { received = argument; });
    const manager = new CommandManager(new PermissionManager('owner'), registry, { complete: (prompt) => new FixedModel().generate(prompt) });
    await expect(manager.handle('owner', 'please walk to 10 64 -3')).resolves.toBe(true);
    expect(received).toBe('10 64 -3');
  });

  it('does not send untrusted chat to Gemini', async () => {
    const registry = new CommandRegistry();
    const manager = new CommandManager(new PermissionManager('owner'), registry, { complete: (prompt) => new FixedModel().generate(prompt) });
    await expect(manager.handle('stranger', 'move to spawn')).resolves.toBe(false);
  });

  it('requires an exact owner username match', async () => {
    const registry = new CommandRegistry();
    const manager = new CommandManager(new PermissionManager('Owner'), registry, { complete: (prompt) => new FixedModel().generate(prompt) });
    await expect(manager.handle('owner', 'please move')).resolves.toBe(false);
  });
});
