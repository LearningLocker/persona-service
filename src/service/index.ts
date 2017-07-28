import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import deletePersona from './deletePersona';
import deleteProfile from './deleteProfile';
import getClient from './getClient';
import getFullAgent from './getFullAgent';
import getIdentifier from './getIdentifier';
import getPersona from './getPersona';
import getProfile from './getProfile';
import getProfiles from './getProfiles';
import mergePersona from './mergePersona';
import overwriteProfile from './overwriteProfile';
import patchProfile from './patchProfile';

export default (config: Config): Service => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    deletePersona: deletePersona(config),
    deleteProfile: deleteProfile(config),
    getClient: getClient(config),
    getFullAgent: getFullAgent(config),
    getIdentifier: getIdentifier(config),
    getPersona: getPersona(config),
    getProfile: getProfile(config),
    getProfiles: getProfiles(config),
    mergePersona: mergePersona(config),
    overwriteProfile: overwriteProfile(config),
    patchProfile: patchProfile(config),

    ...commonService(config),
  };
};
