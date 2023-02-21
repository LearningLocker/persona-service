import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import type DeletePersonaAttributeOptions from '../repoFactory/options/DeletePersonaAttributeOptions';
import type Config from './Config';
import { PERSONA_ATTRIBUTES_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({ id, organisation }: DeletePersonaAttributeOptions): Promise<void> => {
    const collection = (await config.db).collection(PERSONA_ATTRIBUTES_COLLECTION);
    const result = await collection.deleteOne({
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    });

    if (result.deletedCount === 0) {
      throw new NoModelWithId('Attribute', id);
    }
  };
};
