import GetIfisByPersonaOptions from '../serviceFactory/options/GetIfisByPersonaOptions';
import GetIfisByPersonaResult from '../serviceFactory/results/GetIfisByPersonaResult';
import Config from './Config';

export default (config: Config) =>
  async (
    { persona: personaId, ...opts }: GetIfisByPersonaOptions,
  ): Promise<GetIfisByPersonaResult> =>
    config.repo.getIfisByPersona({
      ...opts,
      personaId,
    });
