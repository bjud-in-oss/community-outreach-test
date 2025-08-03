import { IMemory } from './IMemory';

export interface ISession {
  readonly id: string;
  readonly shortTermMemory: IMemory;
  readonly longTermMemory: IMemory;
}
