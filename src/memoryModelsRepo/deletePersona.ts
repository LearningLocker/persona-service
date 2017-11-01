import NoModel from 'jscommons/dist/errors/NoModel';
import DeletePersonaOptions from '../repoFactory/options/DeletePersonaOptions';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
  }: DeletePersonaOptions): Promise<void> => {
    const storedPersonas = config.state.personas;
    const remainingPersonas = storedPersonas.filter((persona) => {
      return !(
        persona.id === personaId &&
        persona.organisation === organisation
      );
    });

    if (storedPersonas.length === remainingPersonas.length) {
      throw new NoModel('Persona');
    }

    const remainingIdentifiers = config.state.personaIdentifiers.filter((identifier) => {
      return !(
        identifier.persona === personaId &&
        identifier.organisation === organisation
      );
    });

    config.state.personas = remainingPersonas;
    config.state.personaIdentifiers = remainingIdentifiers;
  };
};
