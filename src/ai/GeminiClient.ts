import { GoogleGenerativeAI } from '@google/generative-ai'; import { aiConfig } from '../config/ai.config.js'; import { retry } from '../utils/Retry.js';
export interface ModelClient { generate(prompt: string): Promise<string>; }
export class GeminiConfigurationError extends Error {
  constructor(message: string) { super(message); this.name = 'GeminiConfigurationError'; }
}

export class GeminiClient implements ModelClient {
  async generate(prompt: string): Promise<string> {
    if (!aiConfig.apiKey.trim()) throw new GeminiConfigurationError('GEMINI_API_KEY is not configured; plain-English owner commands are disabled');
    return retry(async () => {
      const model = new GoogleGenerativeAI(aiConfig.apiKey).getGenerativeModel({ model: aiConfig.model, generationConfig: { responseMimeType: 'application/json' } });
      return (await model.generateContent(prompt)).response.text();
    });
  }
}
