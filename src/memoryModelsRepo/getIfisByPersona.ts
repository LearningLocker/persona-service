import GetIfisByPersonaOptions from '../repoFactory/options/GetIfisByPersonaOptions';
import GetIfisByPersonaResult from '../repoFactory/results/GetIfisByPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    ...opts,
  }: GetIfisByPersonaOptions): Promise<GetIfisByPersonaResult> => {
    const ifis = config.state.personaIdentifiers.filter((identifier) => {
      return identifier.persona === opts.personaId &&
        identifier.organisation === organisation;
    }).map(({ ifi }) => {
      return ifi;
    });
    return { ifis };
  };
};
