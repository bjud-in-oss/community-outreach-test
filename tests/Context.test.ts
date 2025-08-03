import { Context } from '../src/implementations/Context';

describe('Context', () => {
  it('should create a new session', async () => {
    const context = new Context();
    const session = await context.createSession();
    expect(session).toBeDefined();
    expect(session.id).toBeDefined();
  });

  it('should get an existing session', async () => {
    const context = new Context();
    const session1 = await context.createSession();
    const session2 = await context.getSession(session1.id);
    expect(session2).toBe(session1);
  });

  it('should create a new session if one does not exist', async () => {
    const context = new Context();
    const session = await context.getSession('non-existent-id');
    expect(session).toBeDefined();
    expect(session.id).toBe('non-existent-id');
  });
});
