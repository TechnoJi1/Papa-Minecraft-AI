export interface Task { id: string; kind: string; description: string; priority: number; payload?: Record<string, unknown>; createdAt: number; }
export const createTask = (kind: string, description: string, priority = 50, payload?: Record<string, unknown>): Task => ({ id: crypto.randomUUID(), kind, description, priority, payload, createdAt: Date.now() });
