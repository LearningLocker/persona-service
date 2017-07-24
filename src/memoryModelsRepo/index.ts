import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import deleteProfile from './deleteProfile';
import getIdentifierByIfi from './getIdentifierByIfi';
import getIfisByPersona from './getIfisByPersona';
import getPersona from './getPersona';
import getProfile from './getProfile';
import getProfiles from './getProfiles';
import overwriteProfile from './overwriteProfile';
import patchProfile from './patchProfile';
import setIdentifierPersona from './setIdentifierPersona';

export default (config: Config): ModelsRepo => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    deleteProfile: deleteProfile(config),
    getIdentifierByIfi: getIdentifierByIfi(config),
    getIfisByPersona: getIfisByPersona(config),
    getPersona: getPersona(config),
    getProfile: getProfile(config),
    getProfiles: getProfiles(config),
    overwriteProfile: overwriteProfile(config),
    patchProfile: patchProfile(config),
    setIdentifierPersona: setIdentifierPersona(config),
    ...commonMemoryRepo(config),
  };
};
