/* tslint:disable:no-let */
import NoModel from 'jscommons/dist/errors/NoModel';
import { assign } from 'lodash';
import SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import SetIdentifierPersonaResult from '../repoFactory/results/SetIdentifierPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    persona,
    ...opts,
  }: SetIdentifierPersonaOptions): Promise<SetIdentifierPersonaResult> => {

    const personaIdentifeirsToUpdate = config.state.personaIdentifiers.filter((identifier) => {
      if (identifier.id === opts.id && identifier.organisation === organisation) {
        return true;
      }
      return false;
    });

    if (personaIdentifeirsToUpdate.length === 0) {
      throw new NoModel('Persona Identifier');
    }

    const updatedIdentifiers = personaIdentifeirsToUpdate.map((identifier) => {
      return {
        ...identifier,
        persona,
      };
    });

    config.state.personaIdentifiers = assign(config.state.personaIdentifiers, updatedIdentifiers);

    return {identifier: updatedIdentifiers[0]};
  };
};
