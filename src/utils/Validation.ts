export function requireNonEmpty(value: string, label: string): string { if (!value.trim()) throw new Error(`${label} must not be empty`); return value; }
