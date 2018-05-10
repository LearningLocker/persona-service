import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import UpdatePersonaOptions from '../repoFactory/options/UpdatePersonaOptions';
import UpdatePersonaResult from '../repoFactory/results/UpdatePersonaResult';
// tslint:disable-next-line:no-unused
import _UpdatePersonaOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/UpdatePersonaOptions';
// tslint:disable-next-line:no-unused
import _UpdatePersonaResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/UpdatePersonaResult';
import Config from './Config';
import { PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    personaId,
    organisation,
    name,
  }: UpdatePersonaOptions): Promise<UpdatePersonaResult> => {
    const collection = (await config.db).collection(PERSONAS_COLLECTION);

    const result = await collection.findOneAndUpdate({
      _id: new ObjectID(personaId),
      organisation: new ObjectID(organisation),
    },
    {
      $set: {
        name,
      },
    },
    {
      returnOriginal: false,
      upsert: false,
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
