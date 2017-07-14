import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import deleteProfile from './deleteProfile';
import getProfile from './getProfile';
import getProfiles from './getProfiles';
import overwriteProfile from './overwriteProfile';
import patchProfile from './patchProfile';

export default (config: Config): Service => {
  return {
    // Profile functions for the xAPI.
    deleteProfile: deleteProfile(config),
    getProfile: getProfile(config),
    getProfiles: getProfiles(config),
    overwriteProfile: overwriteProfile(config),
    patchProfile: patchProfile(config),

    ...commonService(config),
  };
};
