import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import DeletePersonaIdentifierOptions from '../repoFactory/options/DeletePersonaIdentifierOptions';
import _DeletePersonaIdentifierOptions from // tslint:disable-line:no-unused import-spacing
  '../serviceFactory/options/DeletePersonaIdentifierOptions';
import Config from './Config';

export default (config: Config) => {
  return async ({id, organisation}: DeletePersonaIdentifierOptions): Promise<void> => {
    const collection = (await config.db).collection('personaIdentifiers');

    const result = await collection.deleteOne({
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    });

    if (result.deletedCount === 0) {
      throw new NoModelWithId('identifier', id);
    }
  };
};
