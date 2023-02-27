import type DeletePersonaOptions from '../serviceFactory/options/DeletePersonaOptions';
import type Config from './Config';

export default (config: Config) => {
  return async (opts: DeletePersonaOptions): Promise<void> => {
    await config.repo.deletePersona({
      organisation: opts.organisation,
      personaId: opts.personaId,
    });
  };
};
