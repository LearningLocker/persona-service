import BaseModel from './BaseModel';

export default interface Info extends BaseModel {
  readonly identifier_id: string;
  readonly key: string;
  readonly value: string;
}
