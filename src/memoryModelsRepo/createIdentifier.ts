import { v4 as uuid } from 'uuid';
import Identifier from '../models/Identifier';
import CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import Config from './Config';
import getIdentifiersMatchingIfi from './utils/getIdentifiersMatchingIfi';

export default (config: Config) => {
  return async (opts: CreateIdentifierOptions): Promise<CreateIdentifierResult> => {
    const matchingIdentifiers = getIdentifiersMatchingIfi({
      client: opts.client,
      config,
      ifi: opts.ifi,
    });

    // Creates the identifier if the IFI doesn't already exist.
    const isExistingIfi = matchingIdentifiers.length !== 0;
    if (!isExistingIfi) {
      const identifier: Identifier = {
        id: uuid(),
        ifi: opts.ifi,
        organisation: opts.client.organisation,
        persona: opts.persona,
      };
      config.state.personaIdentifiers = [
        ...config.state.personaIdentifiers,
        identifier,
      ];
      return { identifier, wasCreated: true };
    }

    return {
      identifier: matchingIdentifiers[0],
      wasCreated: false,
    };
  };
};
