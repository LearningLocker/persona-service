import GetAgentProfilesOptions from '../serviceFactory/options/GetAgentProfilesOptions';
import GetAgentProfilesResult from '../serviceFactory/results/GetAgentProfilesResult';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: GetAgentProfilesOptions): Promise<GetAgentProfilesResult> => {
    return {
      profileIds: [],
    };
  };
};
