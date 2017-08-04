import ClientModel from '../../models/ClientModel';

interface Options {
  readonly client: ClientModel;
  readonly fromPersonaId: string;
  readonly toPersonaId: string;
}

export default Options;
