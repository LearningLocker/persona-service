import DeletePersonaOptions from '../serviceFactory/options/DeletePersonaOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeletePersonaOptions): Promise<void> => {
    return config.repo.deletePersona({
      organisation: opts.client.organisation,
      personaId: opts.personaId,
    });
  };
};
