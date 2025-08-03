import { add } from './math';

describe('add', () => {
  it('should return the sum of two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
});
