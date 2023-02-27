import type Identifier from '../../models/Identifier';

export default interface OverwriteIdentifierResult {
  readonly identifier: Identifier;
  readonly wasCreated: boolean;
}
