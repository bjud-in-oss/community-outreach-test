import { IMemory } from '../interfaces/IMemory';

export class Memory implements IMemory {
  private store = new Map<string, any>();

  async get(key: string): Promise<any> {
    return this.store.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}
