import type GetPersonaOptions from '../serviceFactory/options/GetPersonaOptions';
import type GetPersonaResult from '../serviceFactory/results/GetPersonaResult';
import type Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonaOptions): Promise<GetPersonaResult> => {
    const { name } = await config.repo.getPersona(opts);
    return {
      persona: {
        id: opts.personaId,
        name,
        organisation: opts.organisation,
      },
    };
  };
};
