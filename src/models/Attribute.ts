import type BaseModel from './BaseModel';

export default interface Attribute extends BaseModel {
  readonly personaId: string;
  readonly key: string;
  readonly value: string | number | boolean;
}
