import commonMemoryRepo from 'jscommons/dist/memoryRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import getIdentifierByIfi from './getIdentifierByIfi';
import getProfileContent from './getProfileContent';
import getProfiles from './getProfiles';
import overwriteProfile from './overwriteProfile';
import patchProfile from './patchProfile';
import setIdentifierPersona from './setIdentifierPersona';

export default (config: Config): ModelsRepo => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    getIdentifierByIfi: getIdentifierByIfi(config),
    getProfileContent: getProfileContent(config),
    getProfiles: getProfiles(config),
    overwriteProfile: overwriteProfile(config),
    patchProfile: patchProfile(config),
    setIdentifierPersona: setIdentifierPersona(config),
    ...commonMemoryRepo(config),
  };
};
