import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import DeletePersonaAttributeOptions from '../repoFactory/options/DeletePersonaAttributeOptions';
import _DeletePersonaAttributeOptions from // tslint:disable-line:no-unused import-spacing
  '../serviceFactory/options/DeletePersonaAttributeOptions';
import Config from './Config';

export default (config: Config) => {
  return async ({id, organisation}: DeletePersonaAttributeOptions): Promise<void> => {
    const collection = (await config.db).collection('personaAttributes');

    const result = await collection.deleteOne({
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    });

    if (result.deletedCount === 0) {
      throw new NoModelWithId('Attribute', id);
    }
  };
};
