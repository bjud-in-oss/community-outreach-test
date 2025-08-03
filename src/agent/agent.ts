import { IContext } from '../interfaces/IContext';
import { ISession } from '../interfaces/ISession';

export class Agent {
  private context: IContext;
  private sessionId: string;

  constructor(context: IContext, sessionId: string) {
    this.context = context;
    this.sessionId = sessionId;
  }

  async getSession(): Promise<ISession> {
    return this.context.getSession(this.sessionId);
  }

  async processMessage(message: string): Promise<string> {
    const session = await this.getSession();
    const history = (await session.shortTermMemory.get('history')) || [];
    history.push(message);
    await session.shortTermMemory.set('history', history);
    return `Message processed. History: ${history.join(', ')}`;
  }
}
