import 'dotenv/config';

const number = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const config = Object.freeze({ minecraft: { host: process.env.MINECRAFT_HOST ?? 'localhost', port: number(process.env.MINECRAFT_PORT, 25565), username: process.env.MINECRAFT_USERNAME ?? 'PapaAI', version: process.env.MINECRAFT_VERSION || false }, ai: { apiKey: process.env.GEMINI_API_KEY ?? '', model: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash' }, ownerUsername: process.env.OWNER_USERNAME ?? 'owner', tickIntervalMs: number(process.env.TICK_INTERVAL_MS, 1000), logLevel: process.env.LOG_LEVEL ?? 'info', apiPort: number(process.env.API_PORT, 3000), databasePath: process.env.DATABASE_PATH ?? 'data/papa.sqlite' });
export type AppConfig = typeof config;
