import { ModelRouter } from '../ai/ModelRouter.js';
import { logger } from '../utils/Logger.js';
import { IntentClassifier } from './IntentClassifier.js';
import { NaturalLanguage } from './NaturalLanguage.js';
import { PermissionManager } from './PermissionManager.js';
import { CommandRegistry } from './CommandRegistry.js';

/** Owner-only chat entry point. `!` commands are deterministic; other messages use Gemini. */
export class CommandManager {
  private readonly naturalLanguage: NaturalLanguage;

  constructor(
    private readonly permissions: PermissionManager,
    private readonly registry: CommandRegistry,
    model = new ModelRouter(),
    private readonly classifier = new IntentClassifier(),
  ) {
    this.naturalLanguage = new NaturalLanguage({ generate: (prompt) => model.complete(prompt) });
  }

  async handle(username: string, message: string): Promise<boolean> {
    if (!this.permissions.canControl(username)) return false;
    try {
      if (message.trim().startsWith('!')) {
        const { intent, argument } = this.classifier.classify(message);
        return this.registry.dispatch(intent, argument);
      }
      const command = await this.naturalLanguage.classify(message);
      if (command.intent === 'unknown' || command.confidence < 0.6) return false;
      return this.registry.dispatch(command.intent, command.argument);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'unknown command processing error';
      logger.warn({ error, reason, username }, 'owner command could not be interpreted');
      return false;
    }
  }
}
