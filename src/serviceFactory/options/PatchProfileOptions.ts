import ClientModel from '../../models/ClientModel';

interface Options {
  agent: any;
  client: ClientModel;
  profileId: string;
  content: NodeJS.ReadableStream;
}

export default Options;
