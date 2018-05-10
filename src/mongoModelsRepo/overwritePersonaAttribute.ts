import { ObjectID } from 'mongodb';
import OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/OverwritePersonaAttributeOptions';
import OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/OverwritePersonaAttributeResult';
// tslint:disable-next-line:no-unused
import _OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../serviceFactory/options/OverwritePersonaAttributeOptions';
// tslint:disable-next-line:no-unused
import _OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../serviceFactory/results/OverwritePersonaAttributeResult';
import Config from './Config';
import { PERSONA_ATTRIBUTES_COLLECTION } from './utils/constants/collections';
import getPersonaById from './utils/getPersonaById';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
    key,
    value,
  }: OverwritePersonaAttributeOptions): Promise<OverwritePersonaAttributeResult> => {
    const collection = (await config.db).collection(PERSONA_ATTRIBUTES_COLLECTION);

    // check persona exists
    await getPersonaById(config)({ organisation, personaId });

    const result = await collection.findOneAndUpdate({
      key,
      organisation: new ObjectID(organisation),
      personaId: new ObjectID(personaId),
    },
    {
      $set: {
        value,
      },
    },
    {
      returnOriginal: false,
      upsert: true,
    });

    const attribute = {
      id: result.value._id.toString(),
      key: result.value.key,
      organisation,
      personaId,
      value: result.value.value,
    };

    return {
      attribute,
    };
  };
};
