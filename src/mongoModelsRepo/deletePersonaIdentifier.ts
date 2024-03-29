import { ObjectId } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import type DeletePersonaIdentifierOptions from '../repoFactory/options/DeletePersonaIdentifierOptions';
import type Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({ id, organisation }: DeletePersonaIdentifierOptions): Promise<void> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      organisation: new ObjectId(organisation),
    });

    if (result.deletedCount === 0) {
      throw new NoModelWithId('identifier', id);
    }
  };
};
