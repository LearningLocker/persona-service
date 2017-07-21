import ClientModel from '../../models/ClientModel';

interface Options {
  client: ClientModel;
  content: any;
  contentType: string;
  etag: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  personaIdentifier: string;
  profileId: string;
}

export default Options;
