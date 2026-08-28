export interface Plugin { name: string; initialize(): Promise<void>; }
