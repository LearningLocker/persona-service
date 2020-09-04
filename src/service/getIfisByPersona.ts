import GetIfisByPersonaOptions from '../serviceFactory/options/GetIfisByPersonaOptions';
import GetIfisByPersonaResult from '../serviceFactory/results/GetIfisByPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    persona: personaId,
    ...opts // tslint:disable-line:trailing-comma // not a valid build with a comma
  }: GetIfisByPersonaOptions): Promise<GetIfisByPersonaResult> => {
    return config.repo.getIfisByPersona({
      ...opts,
      personaId,
    });
  };
};
