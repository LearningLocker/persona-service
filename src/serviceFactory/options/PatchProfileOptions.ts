import ClientModel from '../../models/ClientModel';

interface Options {
  agent: any;
  client: ClientModel;
  profileId: string;
  content: NodeJS.ReadableStream;
  contentType: string;
}

export default Options;
