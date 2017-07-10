import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import deleteAgentProfile from './deleteAgentProfile';
import getAgentProfile from './getAgentProfile';
import getAgentProfiles from './getAgentProfiles';
import overwriteAgentProfile from './overwriteAgentProfile';
import patchAgentProfile from './patchAgentProfile';

export default (config: Config): Service => {
  return {
    // Agent Profile functions for the xAPI.
    deleteAgentProfile: deleteAgentProfile(config),
    getAgentProfile: getAgentProfile(config),
    getAgentProfiles: getAgentProfiles(config),
    overwriteAgentProfile: overwriteAgentProfile(config),
    patchAgentProfile: patchAgentProfile(config),

    ...commonService(config),
  };
};
