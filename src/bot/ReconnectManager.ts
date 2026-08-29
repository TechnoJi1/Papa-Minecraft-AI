import type { Bot } from 'mineflayer';
import { logger } from '../utils/Logger.js';

/** Schedules exactly one reconnect per disconnected bot and resets backoff after spawn. */
export class ReconnectManager {
  private attempts = 0;
  private timer?: NodeJS.Timeout;
  private reconnecting = false;

  constructor(private readonly create: () => Bot, private readonly maxDelayMs = 30_000) {}

  watch(bot: Bot): void {
    const schedule = (reason: string): void => {
      if (this.reconnecting) return;
      this.reconnecting = true;
      const delay = Math.min(1_000 * 2 ** this.attempts++, this.maxDelayMs);
      logger.warn({ delay, reason }, 'Minecraft bot disconnected; reconnect scheduled');
      this.timer = setTimeout(() => {
        this.reconnecting = false;
        this.watch(this.create());
      }, delay);
    };
    bot.once('spawn', () => { this.attempts = 0; });
    bot.once('end', (reason: string) => schedule(reason || 'connection ended'));
    bot.once('kicked', (reason: string) => schedule(reason || 'kicked'));
  }

  stop(): void {
    if (this.timer) clearTimeout(this.timer);
    this.timer = undefined;
    this.reconnecting = false;
  }
}
