import { calculate } from './calculator';

describe('calculate', () => {
  it('should add two numbers', () => {
    expect(calculate({ a: 1, b: 2, operator: '+' })).toBe(3);
  });

  it('should subtract two numbers', () => {
    expect(calculate({ a: 2, b: 1, operator: '-' })).toBe(1);
  });

  it('should multiply two numbers', () => {
    expect(calculate({ a: 2, b: 3, operator: '*' })).toBe(6);
  });

  it('should divide two numbers', () => {
    expect(calculate({ a: 6, b: 3, operator: '/' })).toBe(2);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => calculate({ a: 1, b: 0, operator: '/' })).toThrow(
      'Cannot divide by zero.'
    );
  });

  it('should throw an error for an invalid operator', () => {
    expect(() => calculate({ a: 1, b: 2, operator: '%' as any })).toThrow(
      'Invalid operator.'
    );
  });
});
