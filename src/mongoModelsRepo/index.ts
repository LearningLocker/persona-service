import commonMongoRepo from 'jscommons/dist/mongoRepo';
import Repo from '../repoFactory/Repo';
import Config from './Config';
import createIdentifier from './createIdentifier';
import createPersona from './createPersona';
import deletePersona from './deletePersona';
import getIdentifier from './getIdentifier';
import getIdentifierByIfi from './getIdentifierByIfi';
import getIfisByPersona from './getIfisByPersona';
import getPersona from './getPersona';
import mergePersona from './mergePersona';
import overwriteIdentifier from './overwriteIdentifier';
import setIdentifierPersona from './setIdentifierPersona';

export default (config: Config): Repo => {
  return {
    createIdentifier: createIdentifier(config),
    createPersona: createPersona(config),
    deletePersona: deletePersona(config),
    getIdentifier: getIdentifier(config),
    getIdentifierByIfi: getIdentifierByIfi(config),
    getIfisByPersona: getIfisByPersona(config),
    getPersona: getPersona(config),
    mergePersona: mergePersona(config),
    overwriteIdentifier: overwriteIdentifier(config),
    setIdentifierPersona: setIdentifierPersona(config),
    ...commonMongoRepo(config),
  };
};
