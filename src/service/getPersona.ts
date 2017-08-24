import GetPersonaOptions from '../serviceFactory/options/GetPersonaOptions';
import GetPersonaResult from '../serviceFactory/results/GetPersonaResult';
import Config from './Config';

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
