import type { Bot } from 'mineflayer'; import { logger } from '../utils/Logger.js';
export class ConnectionManager { attach(bot: Bot): void { bot.once('spawn', () => logger.info('Minecraft bot spawned')); bot.on('chat', (username, message) => logger.info({ username, message }, 'chat received')); bot.on('error', (error) => logger.warn({ error }, 'Minecraft connection error')); } }
