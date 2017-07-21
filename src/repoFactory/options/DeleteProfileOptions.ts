import ClientModel from '../../models/ClientModel';

interface Options {
  client: ClientModel;
  ifMatch?: string;
  personaIdentifier: string;
  profileId: string;
}

export default Options;
