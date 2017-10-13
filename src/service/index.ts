import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createInfo from './createInfo';
import createPersona from './createPersona';
import createUpdateIdentifierPersona from './createUpdateIdentifierPersona';
import deletePersona from './deletePersona';
import getIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import getIdentifiers from './getIdentifiers';
import getIfisByPersona from './getIfisByPersona';
import getInfoByPersona from './getInfoByPersona';
import getPersona from './getPersona';
import getPersonas from './getPersonas';
import mergePersona from './mergePersona';
import overwriteIdentifier from './overwriteIdentifier';
import setIdentifierPersona from './setIdentifierPersona';

export default (config: Config): Service => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    createUpdateIdentifierPersona: createUpdateIdentifierPersona(config),
    deletePersona: deletePersona(config),
    getIdentifier: getIdentifier(config),
    getIdentifierByIfi: getIdentifierByIfi(config),
    getIdentifiers: getIdentifiers(config),
    getIfisByPersona: getIfisByPersona(config),
    getPersona: getPersona(config),
    getPersonas: getPersonas(config),
    mergePersona: mergePersona(config),
    overwriteIdentifier: overwriteIdentifier(config),
    setIdentifierPersona: setIdentifierPersona(config),
    createInfo: createInfo(config),
    getInfoByPersona: getInfoByPersona(config),

    ...commonService(config),
  };
};
