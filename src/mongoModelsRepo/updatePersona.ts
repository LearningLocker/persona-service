import { ObjectId } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import UpdatePersonaOptions from '../repoFactory/options/UpdatePersonaOptions';
import UpdatePersonaResult from '../repoFactory/results/UpdatePersonaResult';
import Config from './Config';
import { PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    personaId,
    organisation,
    name,
    upsert = false,
  }: UpdatePersonaOptions): Promise<UpdatePersonaResult> => {
    const collection = (await config.db).collection(PERSONAS_COLLECTION);

    const result = await collection.findOneAndUpdate({
      _id: new ObjectId(personaId),
      organisation: new ObjectId(organisation),
    },
    {
      $set: {
        name,
      },
    },
    {
      returnDocument: 'after',
      upsert,
    });

    if (result.value === null || result.value === undefined) {
      throw new NoModelWithId('personas', personaId);
    }

    const persona = {
      id: result.value._id.toString(),
      name,
      organisation,
    };

    return {
      persona,
    };
  };
};
