import commonMongoRepo from 'jscommons/dist/mongoRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import deletePersona from './deletePersona';
import deleteProfile from './deleteProfile';
import getIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import getIfisByPersona from './getIfisByPersona';
import getPersona from './getPersona';
import getProfile from './getProfile';
import getProfiles from './getProfiles';
import mergePersona from './mergePersona';
import overwriteProfile from './overwriteProfile';
import patchProfile from './patchProfile';
import setIdentifierPersona from './setIdentifierPersona';

export default (config: Config): ModelsRepo => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    deletePersona: deletePersona(config),
    deleteProfile: deleteProfile(config),
    getIdentifier: getIdentifier(config),
    getIdentifierByIfi: getIdentifierByIfi(config),
    getIfisByPersona: getIfisByPersona(config),
    getPersona: getPersona(config),
    getProfile: getProfile(config),
    getProfiles: getProfiles(config),
    mergePersona: mergePersona(config),
    overwriteProfile: overwriteProfile(config),
    patchProfile: patchProfile(config),
    setIdentifierPersona: setIdentifierPersona(config),
    ...commonMongoRepo(config),
  };
};
