import { sayHello } from './hello';

describe('sayHello', () => {
  it('should return a greeting', () => {
    const name = 'Jules';
    const expected = `Hello, ${name}! Welcome to Master Plan 2.0`;
    const result = sayHello(name);
    expect(result).toBe(expected);
  });
});
