import type Identifier from '../../models/Identifier';

export interface CreatePersonaAndAddToIdentifierOptions {
  readonly identifier: Identifier;
  readonly personaName?: string;
}
