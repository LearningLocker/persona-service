import ClientModel from '../../models/ClientModel';

interface Options {
  agent: any;
  client: ClientModel;
  profileId: string;
  ifMatch?: string;
}

export default Options;
