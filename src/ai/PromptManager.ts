import { readFile } from 'node:fs/promises'; export class PromptManager { async load(name: string): Promise<string> { return readFile(`prompts/${name}.md`, 'utf8'); } }
