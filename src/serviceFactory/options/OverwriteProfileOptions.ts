import ClientModel from '../../models/ClientModel';

interface Options {
  agent: any;
  client: ClientModel;
  content: NodeJS.ReadableStream;
  contentType: string;
  ifMatch?: string;
  ifNoneMatch?: string;
  profileId: string;
}

export default Options;
