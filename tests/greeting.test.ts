import { greet } from '../lib/greeting';

describe('greet', () => {
  it('should return a Swedish greeting', () => {
    expect(greet()).toBe('Hej, välkommen!');
  });
});
