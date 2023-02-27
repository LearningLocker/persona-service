import type GetIfisByPersonaOptions from '../serviceFactory/options/GetIfisByPersonaOptions';
import type GetIfisByPersonaResult from '../serviceFactory/results/GetIfisByPersonaResult';
import type Config from './Config';

export default (config: Config) =>
  async (
    { persona: personaId, ...opts }: GetIfisByPersonaOptions,
  ): Promise<GetIfisByPersonaResult> =>
    await config.repo.getIfisByPersona({
      ...opts,
      personaId,
    });
