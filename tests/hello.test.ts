import { hello } from '../lib/hello';

describe('hello', () => {
  it('should return a greeting', () => {
    expect(hello('World')).toBe('Hello, World!');
  });
});
