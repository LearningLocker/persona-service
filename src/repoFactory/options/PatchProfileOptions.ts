import ClientModel from '../../models/ClientModel';

interface Options {
  client: ClientModel;
  content: any;
  contentType: string;
  profileId: string;
  personaIdentifier: string;
}

export default Options;
