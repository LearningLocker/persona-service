/* tslint:disable:no-class */
import BaseError from 'jscommons/dist/errors/BaseError';
import Identifier from '../models/Identifier';

export default class extends BaseError {
  readonly message: string;

  constructor(public identifier: Identifier) {
    super();
    this.message = 'Locked';
  }
}
