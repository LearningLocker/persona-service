import Ifi from '../../models/Ifi';

interface Options {
  readonly organisation: string;
  readonly ifi: Ifi;
  readonly personaId: string;
}

export default Options;
