import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import createUpdateIdentifierPersona from './createUpdateIdentifierPersona';
import deletePersona from './deletePersona';
import getIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import getIdentifiers from './getIdentifiers';
import getIfisByPersona from './getIfisByPersona';
import getPersona from './getPersona';
import getPersonaAttributes from './getPersonaAttributes';
import getPersonas from './getPersonas';
import mergePersona from './mergePersona';
import overwriteIdentifier from './overwriteIdentifier';
import overwritePersonaAttribute from './overwritePersonaAttribute';
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
    getPersonaAttributes: getPersonaAttributes(config),
    getPersonas: getPersonas(config),
    mergePersona: mergePersona(config),
    overwriteIdentifier: overwriteIdentifier(config),
    overwritePersonaAttribute: overwritePersonaAttribute(config),
    setIdentifierPersona: setIdentifierPersona(config),

    ...commonService(config),
  };
};
