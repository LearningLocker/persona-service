import commonMongoRepo from 'jscommons/dist/mongoRepo';
import Repo from '../repoFactory/Repo';
import clearRepo from './clearRepo';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import createUpdateIdentifierPersona from './createUpdateIdentifierPersona';
import deletePersona from './deletePersona';
import getAttributes from './getAttributes';
import getIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import getIdentifiers from './getIdentifiers';
import getIfisByPersona from './getIfisByPersona';
import getPersona from './getPersona';
import getPersonaAttributes from './getPersonaAttributes';
import getPersonaCount from './getPersonaCount';
import getPersonas from './getPersonas';
import getPersonasConnection from './getPersonasConnection';
import mergePersona from './mergePersona';
import overwriteIdentifier from './overwriteIdentifier';
import overwritePersonaAttribute from './overwritePersonaAttribute';
import setIdentifierPersona from './setIdentifierPersona';
import updatePersona from './updatePersona';

export default (config: Config): Repo => {
  return {
    ...commonMongoRepo(config),
    clearRepo: clearRepo(config),
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    createUpdateIdentifierPersona: createUpdateIdentifierPersona(config),
    deletePersona: deletePersona(config),
    getAttributes: getAttributes(config),
    getIdentifier: getIdentifier(config),
    getIdentifierByIfi: getIdentifierByIfi(config),
    getIdentifiers: getIdentifiers(config),
    getIfisByPersona: getIfisByPersona(config),
    getPersona: getPersona(config),
    getPersonas: getPersonas(config),
    getPersonaAttributes: getPersonaAttributes(config),
    getPersonaCount: getPersonaCount(config),
    getPersonasConnection: getPersonasConnection(config),
    mergePersona: mergePersona(config),
    overwriteIdentifier: overwriteIdentifier(config),
    overwritePersonaAttribute: overwritePersonaAttribute(config),
    setIdentifierPersona: setIdentifierPersona(config),
    updatePersona: updatePersona(config),
  };
};
