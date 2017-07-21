import ClientModel from '../../models/ClientModel';

interface Options {
  readonly agent: any;
  readonly client: ClientModel;
  readonly profileId: string;
}

export default Options;
