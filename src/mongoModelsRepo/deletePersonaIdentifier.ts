import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import DeletePersonaIdentifierOptions from '../repoFactory/options/DeletePersonaIdentifierOptions';
import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({id, organisation}: DeletePersonaIdentifierOptions): Promise<void> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    const result = await collection.deleteOne({
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    });

    if (result.deletedCount === 0) {
      throw new NoModelWithId('identifier', id);
    }
  };
};
