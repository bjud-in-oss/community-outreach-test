import { ISession } from './ISession';

export interface IContext {
  getSession(sessionId: string): Promise<ISession>;
  createSession(): Promise<ISession>;
}
