import ClientModel from '../../models/ClientModel';

interface Options {
  client: ClientModel;
  content: any;
  contentType: string;
  etag: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  profileId: string;
  personaIdentifier: string;
}

export default Options;
