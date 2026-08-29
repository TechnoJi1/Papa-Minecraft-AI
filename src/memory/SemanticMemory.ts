export class SemanticMemory { private readonly facts = new Set<string>(); add(fact: string): void { this.facts.add(fact); } list(): readonly string[] { return [...this.facts]; } }
