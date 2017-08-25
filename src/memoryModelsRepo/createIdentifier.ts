import { v4 as uuid } from 'uuid';
import PersonaNotSetAndUnlocked from '../errors/PersonaNotSetAndUnlocked';
import Identifier from '../models/Identifier';
import CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import Config from './Config';
import getIdentifiersMatchingIfi from './utils/getIdentifiersMatchingIfi';

export default (config: Config) => {
  return async ({
    locked,
    organisation,
    persona,
    ifi,
  }: CreateIdentifierOptions): Promise<CreateIdentifierResult> => {
    const matchingIdentifiers = getIdentifiersMatchingIfi({
      config,
      ifi,
      organisation,
    });

    if ((locked === false || locked === undefined) && persona === undefined) {
      throw new PersonaNotSetAndUnlocked();
    }

    // Creates the identifier if the IFI doesn't already exist.
    const isExistingIfi = matchingIdentifiers.length !== 0;
    if (!isExistingIfi) {
      const identifier: Identifier = {
        id: uuid(),
        ifi,
        organisation,
        persona,
      };
      config.state.personaIdentifiers = [
        ...config.state.personaIdentifiers,
        {
          ...identifier,
          locked,
        },
      ];
      return { identifier, wasCreated: true };
    }

    return {
      identifier: matchingIdentifiers[0],
      wasCreated: false,
    };
  };
};
