import type SetIdentifierPersonaOptions from '../serviceFactory/options/SetIdentifierPersonaOptions';
import type SetIdentifierPersonaResult from '../serviceFactory/results/SetIdentifierPersonaResult';
import type Config from './Config';

/*
  Very similar to overwriteidentifier, only difference being it will error if no identifier
  is found.
*/
export default (config: Config) => {
  return async (opts: SetIdentifierPersonaOptions): Promise<SetIdentifierPersonaResult> => {
    return await config.repo.setIdentifierPersona(opts);
  };
};
