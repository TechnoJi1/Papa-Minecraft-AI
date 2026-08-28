import { ActionManager } from './actions/ActionManager.js';
import { PapaBot } from './bot/Bot.js';
import { CommandManager } from './commands/CommandManager.js';
import { CommandRegistry } from './commands/CommandRegistry.js';
import { PermissionManager } from './commands/PermissionManager.js';
import { ChatManager } from './communication/ChatManager.js';
import { config } from './config/config.js';
import { TaskExecutor } from './task/TaskExecutor.js';
import { TaskManager } from './task/TaskManager.js';
import { createTask } from './task/Task.js';
import { logger } from './utils/Logger.js';

const papa = new PapaBot();
const bot = papa.connect();
const actions = new ActionManager(bot);
const tasks = new TaskManager(new TaskExecutor(async (task) => {
  const result = await actions.executor.execute(task);
  if (!result.ok) throw new Error(result.message);
}));
const registry = new CommandRegistry();
const schedule = async (kind: string, description: string, payload?: Record<string, unknown>): Promise<void> => {
  tasks.add(createTask(kind, description, 80, payload));
  await tasks.runNext();
};
registry.register('say', async (argument) => schedule('say', argument));
registry.register('stop', async () => schedule('stop', 'stop'));
registry.register('move', async (argument) => {
  const values = argument.split(/[ ,]+/).map(Number);
  const [x, y, z] = values;
  if (values.length !== 3 || ![x, y, z].every(Number.isFinite)) {
    throw new Error('Use: move <integer-x> <integer-y> <integer-z>');
  }
  await schedule('move', `move to ${x}, ${y}, ${z}`, { x, y, z });
});
new ChatManager(bot, new CommandManager(new PermissionManager(config.ownerUsername), registry)).attach();
bot.once('spawn', () => {
  logger.info({ host: config.minecraft.host, port: config.minecraft.port, username: config.minecraft.username }, 'bot joined Minecraft server');
});
process.on('SIGINT', () => { papa.stop(); process.exit(0); });
logger.info({ host: config.minecraft.host, port: config.minecraft.port, username: config.minecraft.username }, 'Papa-Minecraft-AI connecting');
