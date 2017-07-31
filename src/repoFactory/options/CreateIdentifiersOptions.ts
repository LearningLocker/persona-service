import ClientModel from '../../models/ClientModel';
import Ifi from '../../models/Ifi';

interface Options {
  readonly client: ClientModel;
  readonly ifis: Ifi[];
}

export default Options;
