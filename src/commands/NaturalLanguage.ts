import type { ModelClient } from '../ai/GeminiClient.js';
import { ResponseParser } from '../ai/ResponseParser.js';

export interface CommandIntent {
  intent: 'stop' | 'move' | 'say' | 'unknown';
  argument: string;
  confidence: number;
}

const allowedIntents = new Set<CommandIntent['intent']>([
  'stop', 'move', 'say', 'unknown',
]);

/** Converts plain owner language to a deliberately small, safe command vocabulary. */
export class NaturalLanguage {
  constructor(private readonly model: ModelClient, private readonly parser = new ResponseParser()) {}

  async classify(message: string): Promise<CommandIntent> {
    const prompt = [
      'Classify this Minecraft owner request as JSON only.',
      'Use one intent: stop, move, say, unknown. Do not claim unsupported capabilities.',
      'Return {"intent":"...","argument":"...","confidence":0..1}.',
      `Request: ${JSON.stringify(message)}`,
    ].join('\n');
    const parsed = this.parser.parse<CommandIntent>(await this.model.generate(prompt));
    if (!allowedIntents.has(parsed.intent) || typeof parsed.argument !== 'string' ||
      !Number.isFinite(parsed.confidence)) {
      throw new Error('Gemini returned an invalid command intent');
    }
    return { ...parsed, confidence: Math.max(0, Math.min(1, parsed.confidence)) };
  }
}
