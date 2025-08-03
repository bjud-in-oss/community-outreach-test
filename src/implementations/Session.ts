import { ISession } from '../interfaces/ISession';
import { IMemory } from '../interfaces/IMemory';
import { Memory } from './Memory';

export class Session implements ISession {
  readonly id: string;
  readonly shortTermMemory: IMemory;
  readonly longTermMemory: IMemory;

  constructor(id: string) {
    this.id = id;
    this.shortTermMemory = new Memory();
    this.longTermMemory = new Memory();
  }
}
