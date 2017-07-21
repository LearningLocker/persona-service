import ClientModel from '../../models/ClientModel';

interface Options {
  readonly agent: any;
  readonly client: ClientModel;
  readonly since?: Date;
}

export default Options;
