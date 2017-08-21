import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import deletePersona from './deletePersona';
import getIdentifier from './getIdentifier';
import getIdentifiers from './getIdentifiers';
import getPersona from './getPersona';
import getPersonas from './getPersonas';
import mergePersona from './mergePersona';
import overwriteIdentifier from './overwriteIdentifier';

export default (config: Config): Service => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    deletePersona: deletePersona(config),
    getIdentifier: getIdentifier(config),
    getIdentifiers: getIdentifiers(config),
    getPersona: getPersona(config),
    getPersonas: getPersonas(config),
    mergePersona: mergePersona(config),
    overwriteIdentifier: overwriteIdentifier(config),

    ...commonService(config),
  };
};
