import BaseError from 'jscommons/dist/errors/BaseError';
import type Identifier from '../models/Identifier';

export default class extends BaseError {
  public readonly message: string;

  constructor(public identifier: Identifier) {
    super();
    this.message = 'Locked';
  }
}
