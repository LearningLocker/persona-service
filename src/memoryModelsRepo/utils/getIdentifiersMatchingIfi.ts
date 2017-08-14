import Ifi from '../../models/Ifi';
import Config from '../Config';
import matchIdentifierIfi from './matchIdentifierIfi';

interface Options {
  readonly organisation: string;
  readonly config: Config;
  readonly ifi: Ifi;
}

export default ({ config, organisation, ifi }: Options) => {
  return config.state.personaIdentifiers.filter((identifier) => {
    return matchIdentifierIfi({ identifier, organisation, ifi });
  });
};
