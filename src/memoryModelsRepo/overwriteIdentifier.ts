import { v4 as uuid } from 'uuid';
import Identifier from '../models/Identifier';
import OverwriteIdentifierOptions from '../repoFactory/options/OverwriteIdentifierOptions';
import OverwriteIdentifierResult from '../repoFactory/results/OverwriteIdentifierResult';
import Config from './Config';
import getIdentifiersMatchingIfi from './utils/getIdentifiersMatchingIfi';
import matchIdentifierIfi from './utils/matchIdentifierIfi';

export default (config: Config) => {
  return async ({
    organisation,
    ifi,
    persona,
    locked = false,
  }: OverwriteIdentifierOptions): Promise<OverwriteIdentifierResult> => {
    const matchingIdentifiers = getIdentifiersMatchingIfi({ organisation, config, ifi });
    const isExistingIfi = matchingIdentifiers.length !== 0;

    // Creates the identifier when the IFI does not already exist.
    if (!isExistingIfi) {
      const id = uuid();
      const identifier: Identifier = { id, ifi, organisation, persona };
      config.state.personaIdentifiers = [
        ...config.state.personaIdentifiers,
        identifier,
      ];
      return { identifier, wasCreated: true };
    }

    // Overwrites the identifier when the IFI does already exist.
    const storedIdentifiers = config.state.personaIdentifiers;
    const updatedIdentifiers = storedIdentifiers.map((identifier) => {
      const isMatch = matchIdentifierIfi({ organisation, identifier, ifi });

      if (!isMatch) {
        return identifier;
      }

      return { ...identifier, persona, locked };
    });

    config.state.personaIdentifiers = updatedIdentifiers;

    return {
      identifier: { ...matchingIdentifiers[0] as Identifier, persona },
      wasCreated: false,
    };
  };
};
