import type { Bot } from 'mineflayer';
import { ActionExecutor } from './ActionExecutor.js';
export class ActionManager { readonly executor: ActionExecutor; constructor(bot: Bot) { this.executor = new ActionExecutor(bot); } }
