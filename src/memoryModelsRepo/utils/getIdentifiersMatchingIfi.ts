// tslint:disable-next-line:no-unused
import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';
import Config from '../Config';
import matchIdentifierIfi from './matchIdentifierIfi';

export interface Options {
  readonly organisation: string;
  readonly config: Config;
  readonly ifi: Ifi;
}

export default ({ config, organisation, ifi }: Options) => {
  return config.state.personaIdentifiers.filter((identifier) => {
    return matchIdentifierIfi({ identifier, organisation, ifi });
  });
};
