import type Identifier from '../../models/Identifier';

export default interface GetPersonaAttributesResult {
  readonly identifiers: Identifier[];
}
