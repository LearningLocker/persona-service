import NoModel from 'jscommons/dist/errors/NoModel';
import GetPersonaOptions from '../repoFactory/options/GetPersonaOptions';
import GetPersonaResult from '../repoFactory/results/GetPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetPersonaOptions): Promise<GetPersonaResult> => {
    const matchingProfiles = config.state.personas.filter((persona) => {
      return persona.id === opts.personaId;
    });

    const isExistingIfi = matchingProfiles.length !== 0;
    if (!isExistingIfi) {
      /* istanbul ignore next */
      throw new NoModel('Persona');
    }

    const { name } = matchingProfiles[0];
    return { name };
  };
};
