import type Ifi from '../../models/Ifi';

interface OverwriteIdentifierOptions {
  readonly organisation: string;
  readonly ifi: Ifi;
  readonly persona: string;
}

export default OverwriteIdentifierOptions;
