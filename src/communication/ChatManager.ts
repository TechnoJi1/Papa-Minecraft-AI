import type { Bot } from 'mineflayer';
import type { CommandManager } from '../commands/CommandManager.js';
import { logger } from '../utils/Logger.js';

/** Bridges Mineflayer chat events to the owner command pipeline. */
export class ChatManager {
  constructor(private readonly bot: Bot, private readonly commands: CommandManager) {}

  attach(): void {
    this.bot.on('chat', (username: string, message: string) => {
      void this.commands.handle(username, message).then((handled) => {
        if (handled) logger.info({ username, message }, 'owner command handled');
      });
    });
  }

  say(message: string): void {
    this.bot.chat(message);
  }
}
