import type Ifi from '../../models/Ifi';

export default interface CreateUpdateIdentifierPersonaOptions {
  readonly organisation: string;
  readonly ifi: Ifi;
  readonly personaName: string | undefined;
}
