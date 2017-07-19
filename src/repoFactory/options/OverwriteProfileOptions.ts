import ClientModel from '../../models/ClientModel';

interface Options {
  client: ClientModel;
  content: any;
  contentType: string;
  personaIdentifier: string;
  profileId: string;
}

export default Options;
