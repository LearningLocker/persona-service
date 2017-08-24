import NoModelWithId from '../errors/NoModelWithId';
import GetPersonaOptions from '../repoFactory/options/GetPersonaOptions';
import GetPersonaResult from '../repoFactory/results/GetPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonaOptions): Promise<GetPersonaResult> => {
    const matchingProfiles = config.state.personas.filter((persona) => {
      return persona.id === opts.personaId && persona.organisation === opts.organisation;
    });

    const isExistingIfi = matchingProfiles.length !== 0;
    if (!isExistingIfi) {
      throw new NoModelWithId('Persona', opts.personaId);
    }

    const { name } = matchingProfiles[0];
    return { name };
  };
};
