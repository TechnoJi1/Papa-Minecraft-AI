export class ResponseParser {
  parse<T>(text: string): T {
    const fenced = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    const value: unknown = JSON.parse(fenced);
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('Gemini response must be a JSON object');
    }
    return value as T;
  }
}
