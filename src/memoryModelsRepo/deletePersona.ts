import NoModel from 'jscommons/dist/errors/NoModel';
import DeletePersonaOptions from '../repoFactory/options/DeletePersonaOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeletePersonaOptions): Promise<void> => {
    const storedPersonas = config.state.personas;
    const remainingPersonas = storedPersonas.filter((persona) => {
      return persona.id !== opts.personaId;
    });

    if (storedPersonas.length === remainingPersonas.length) {
      throw new NoModel('Persona');
    }

    config.state.personas = remainingPersonas;
  };
};
