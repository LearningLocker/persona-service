import ClientModel from '../../models/ClientModel';

interface Options {
  readonly client: ClientModel;
  readonly personaIdentifier: string;
  readonly since?: Date;
}

export default Options;
