import ClientModel from '../../models/ClientModel';

interface Options {
  readonly client: ClientModel;
  readonly personaIdentifier: string;
  readonly profileId: string;
}

export default Options;
