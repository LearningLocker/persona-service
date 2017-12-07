
import Identifier from '../../models/Identifier';

export default interface CreateUpdateIdentifierPersonaResult {
  readonly personaId: string;
  readonly identifier: Identifier;
  readonly identifierId: string;
  readonly wasCreated: boolean;
}
