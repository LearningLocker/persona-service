import type Ifi from '../../models/Ifi';

interface CreateIdentifierOptions {
  readonly organisation: string;
  readonly ifi: Ifi;
  readonly persona: string; // personaId
}

export default CreateIdentifierOptions;
