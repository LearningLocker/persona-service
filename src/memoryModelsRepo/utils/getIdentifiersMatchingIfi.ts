import Ifi from '../../models/Ifi';
import Config from '../Config';
import matchIdentifierIfi from './matchIdentifierIfi';

export default (config: Config, ifi: Ifi) => {
  return config.state.personaIdentifiers.filter((storedIdentifier) => {
    return matchIdentifierIfi(storedIdentifier, ifi);
  });
};
