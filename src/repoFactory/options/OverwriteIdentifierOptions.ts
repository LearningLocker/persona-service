import ClientModel from '../../models/ClientModel';
import Ifi from '../../models/Ifi';

interface Options {
  readonly client: ClientModel;
  readonly ifi: Ifi;
  readonly personaId: string;
}

export default Options;
