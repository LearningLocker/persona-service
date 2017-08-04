import ClientModel from '../../models/ClientModel';

interface GetIdentifierOptions {
  readonly client: ClientModel;
  readonly id: string;
}

export default GetIdentifierOptions;
