import ClientModel from '../../models/ClientModel';
import Ifi from '../../models/Ifi';
import Config from '../Config';
import getIdentifiersMatchingIfi from './getIdentifiersMatchingIfi';

interface Options {
  client: ClientModel;
  config: Config;
  ifi: Ifi;
}

export default ({ config, client, ifi }: Options) => {
  const matchingIdentifiers = getIdentifiersMatchingIfi({ client, config, ifi });
  return matchingIdentifiers.length !== 0;
};
