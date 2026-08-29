declare const process: { env: Record<string, string | undefined>; on(event: string, listener: () => void): void; exit(code?: number): never };
declare namespace NodeJS { type Timeout = number; }
declare module 'dotenv/config';
declare module 'pino' { const pino: (options?: unknown) => { info: (...args: unknown[]) => void; warn: (...args: unknown[]) => void; error: (...args: unknown[]) => void }; export default pino; }
declare module '@google/generative-ai' { export class GoogleGenerativeAI { constructor(key: string); getGenerativeModel(options: unknown): { generateContent(prompt: string): Promise<{ response: { text(): string } }> }; } }
declare module 'mineflayer' { export interface Bot { health: number; food: number; entity?: { position: { x: number; y: number; z: number } }; entities: Record<string, { name?: string; displayName?: string }>; pathfinder: { setGoal(goal: unknown): void }; chat(message: string): void; loadPlugin(plugin: unknown): void; once(event: string, handler: (...args: any[]) => void): void; on(event: string, handler: (...args: any[]) => void): void; quit(reason?: string): void; } const mineflayer: { createBot(options: unknown): Bot }; export default mineflayer; }
declare module 'mineflayer-pathfinder' { export const pathfinder: unknown; export const goals: { GoalBlock: new (x: number, y: number, z: number) => unknown }; }
declare module 'better-sqlite3' { namespace Sqlite { interface Database { exec(sql: string): void; prepare(sql: string): { run(...values: unknown[]): void; all(...values: unknown[]): unknown[]; get(...values: unknown[]): unknown }; close(): void; } } const Sqlite: { new(path: string): Sqlite.Database }; export default Sqlite; }
declare module 'express' { import type { Server } from 'node:http'; type Handler = (req: unknown, res: { json(value: unknown): void }) => void; export interface App { get(path: string, handler: Handler): void; listen(port: number, callback: () => void): Server; } const express: () => App; export default express; }
declare module 'node:http' { export interface Server { close(callback: () => void): void; } }
declare module 'ws' { export class WebSocketServer { clients: Set<{ readyState: number; OPEN: number; send(data: string): void }>; constructor(options: unknown); on(event: string, listener: () => void): void; } }
declare module 'node:fs/promises' { export function readFile(path: string, encoding: string): Promise<string>; }
declare module 'node:fs' { export function mkdirSync(path: string, options: unknown): void; }
declare module 'node:path' { export function dirname(path: string): string; }
