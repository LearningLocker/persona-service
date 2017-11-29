import { findIndex } from 'lodash';
import NoModelWithId from '../errors/NoModelWithId';
import Identifier from '../models/Identifier';
import UpdateIdentifierOptions from '../serviceFactory/options/UpdateIdentifierOptions';
import UpdateIdentifierResult from '../serviceFactory/results/UpdateIdentifierResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    id,
    persona,
    organisation,
    ifi,
  }: UpdateIdentifierOptions): Promise<UpdateIdentifierResult> => {
    const identifierIndex = findIndex(config.state.personaIdentifiers, {
      id,
      organisation,
    });

    if (identifierIndex < 0) {
      throw new NoModelWithId('personaIdentifier', id);
    }

    const newIdentifier: Identifier = {
      ...(config.state.personaIdentifiers[identifierIndex] as Identifier),
      ifi,
      persona,
    };

    const newIdentifiers = [
      ...config.state.personaIdentifiers.slice(
        0,
        identifierIndex,
      ),
      newIdentifier,
      ...config.state.personaIdentifiers.slice(identifierIndex + 1),
    ];

    config.state.personaIdentifiers = newIdentifiers;

    return {
      identifier: newIdentifier,
    };
  };
};
