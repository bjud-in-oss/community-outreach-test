import { IContext } from '../interfaces/IContext';
import { ISession } from '../interfaces/ISession';
import { Session } from './Session';
import { v4 as uuidv4 } from 'uuid';

export class Context implements IContext {
  private sessions = new Map<string, ISession>();

  async getSession(sessionId: string): Promise<ISession> {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = new Session(sessionId);
      this.sessions.set(sessionId, session);
    }
    return session;
  }

  async createSession(): Promise<ISession> {
    const sessionId = uuidv4();
    const session = new Session(sessionId);
    this.sessions.set(sessionId, session);
    return session;
  }
}
