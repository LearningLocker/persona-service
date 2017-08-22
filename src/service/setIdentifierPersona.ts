import SetIdentifierPersonaOptions from '../serviceFactory/options/SetIdentifierPersonaOptions';
import SetIdentifierPersonaResult from '../serviceFactory/results/SetIdentifierPersonaResult';
import Config from './Config';

/*
  Very similar to overwriteidentifier, only difference being it will error if no identifier
  is found.
*/
export default (config: Config) => {
  return async (opts: SetIdentifierPersonaOptions): Promise<SetIdentifierPersonaResult> => {
    return config.repo.setIdentifierPersona(opts);
  };
};
