import type { Bot } from 'mineflayer'; import { BotState } from './BotState.js';
export class BotLifecycle { constructor(private readonly state: BotState) {} start(bot: Bot): void { this.state.set('connecting'); bot.once('spawn', () => this.state.set('idle')); } stop(bot: Bot): void { this.state.set('stopped'); bot.quit('Shutting down'); } }
