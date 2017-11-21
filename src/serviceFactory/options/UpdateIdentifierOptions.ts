import Ifi from '../../models/Ifi';

interface UpdateIdentifierOptions {
  readonly id: string;
  readonly ifi: Ifi;
  readonly persona?: string;
  readonly organisation: string;
}

export default UpdateIdentifierOptions;
