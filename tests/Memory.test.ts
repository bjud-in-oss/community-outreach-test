import { Memory } from '../src/implementations/Memory';

describe('Memory', () => {
  it('should set and get a value', async () => {
    const memory = new Memory();
    await memory.set('key', 'value');
    const value = await memory.get('key');
    expect(value).toBe('value');
  });

  it('should delete a value', async () => {
    const memory = new Memory();
    await memory.set('key', 'value');
    await memory.delete('key');
    const value = await memory.get('key');
    expect(value).toBeUndefined();
  });
});
