import ClientModel from '../../models/ClientModel';

interface Options {
  client: ClientModel;
  personaIdentifier: string;
  since?: Date;
}

export default Options;
