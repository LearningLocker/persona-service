import ClientModel from '../../models/ClientModel';
import Ifi from '../../models/Ifi';
import Config from '../Config';
import matchIdentifierIfi from './matchIdentifierIfi';

interface Options {
  readonly client: ClientModel;
  readonly config: Config;
  readonly ifi: Ifi;
}

export default ({ config, client, ifi }: Options) => {
  return config.state.personaIdentifiers.filter((identifier) => {
    return matchIdentifierIfi({ identifier, client, ifi });
  });
};
