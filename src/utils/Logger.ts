import pino from 'pino'; import { config } from '../config/config.js';
export const logger = pino({ level: config.logLevel, base: { service: 'papa-minecraft-ai' } });
