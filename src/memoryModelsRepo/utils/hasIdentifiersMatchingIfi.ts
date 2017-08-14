import Ifi from '../../models/Ifi';
import Config from '../Config';
import getIdentifiersMatchingIfi from './getIdentifiersMatchingIfi';

interface Options {
  readonly organisation: string;
  readonly config: Config;
  readonly ifi: Ifi;
}

export default ({ config, organisation, ifi }: Options) => {
  const matchingIdentifiers = getIdentifiersMatchingIfi({ organisation, config, ifi });
  return matchingIdentifiers.length !== 0;
};
