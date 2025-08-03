export interface WorkingMemory {
  add(learning: string): void;
  get(): string[];
}

export interface ShortTermMemory {
  store(learnings: string[]): void;
  retrieve(): string[];
}

export interface LongTermMemory {
  store(learnings: string[]): Promise<void>;
  retrieve(query: string): Promise<string[]>;
  prioritize(learnings: string[]): string[];
}
