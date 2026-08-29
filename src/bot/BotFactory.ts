import mineflayer, { type Bot } from 'mineflayer'; import { pathfinder } from 'mineflayer-pathfinder'; import { minecraftConfig } from '../config/minecraft.config.js';
export class BotFactory { create(): Bot { const bot = mineflayer.createBot(minecraftConfig); bot.loadPlugin(pathfinder); return bot; } }
