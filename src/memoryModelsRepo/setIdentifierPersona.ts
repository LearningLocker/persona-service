import NoModel from 'jscommons/dist/errors/NoModel';
import SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: SetIdentifierPersonaOptions) => {
    let found = false;
    config.state.personaIdentifiers = config.state.personaIdentifiers.map((identifier) => {
      if (identifier.id !== opts.id) {
        return identifier;
      }

      found = true;
      return {
        ...identifier,
        persona: opts.persona,
      };
    });

    if (found === false) {
      throw new NoModel('Persona Identifier');
    }
  };
};
