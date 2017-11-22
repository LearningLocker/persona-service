import NoModelWithId from '../errors/NoModelWithId';
import DeletePersonaIdentifierOptions from '../repoFactory/options/DeletePersonaIdentifierOptions';
import _DeletePersonaIdentifierOptions from // tslint:disable-line:no-unused import-spacing
'../serviceFactory/options/DeletePersonaIdentifierOptions';
import Config from './Config';

export default (config: Config) => {
  return async ({
    id,
    organisation,
  }: DeletePersonaIdentifierOptions): Promise<void> => {

    const remainingIdentifiers = config.state.personaIdentifiers.filter((identifier) => {
      return !(
        identifier.id === id &&
        identifier.organisation === organisation
      );
    });

    if (remainingIdentifiers.length === config.state.personaIdentifiers.length) {
      throw new NoModelWithId('identifier', id);
    }

    config.state.personaIdentifiers = remainingIdentifiers;
  };
};
