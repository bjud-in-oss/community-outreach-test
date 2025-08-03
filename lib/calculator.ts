export type Operator = '+' | '-' | '*' | '/';

export interface Calculation {
  a: number;
  b: number;
  operator: Operator;
}

export function calculate({ a, b, operator }: Calculation): number {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return a / b;
    default:
      throw new Error('Invalid operator.');
  }
}
