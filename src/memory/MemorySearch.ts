export const searchMemory = (entries: readonly string[], query: string): string[] => entries.filter((entry) => entry.toLowerCase().includes(query.toLowerCase()));
