import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import deletePersona from './deletePersona';
import getIdentifier from './getIdentifier';
import getIdentifiers from './getIdentifiers';
import getPersona from './getPersona';
import mergePersona from './mergePersona';

export default (config: Config): Service => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    deletePersona: deletePersona(config),
    getIdentifier: getIdentifier(config),
    getIdentifiers: getIdentifiers(config),
    getPersona: getPersona(config),
    mergePersona: mergePersona(config),

    ...commonService(config),
  };
};
