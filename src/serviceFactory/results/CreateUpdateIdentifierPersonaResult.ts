import type Identifier from '../../models/Identifier';

export default interface CreateUpdateIdentifierPersonaResult {
  readonly personaId: string;
  readonly identifierId: string;
  readonly identifier: Identifier;
  readonly wasCreated: boolean;
}
