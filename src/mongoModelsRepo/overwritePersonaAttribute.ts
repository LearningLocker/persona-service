import { MongoError, ObjectID } from 'mongodb';
import OverwritePersonaAttributeOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/OverwritePersonaAttributeOptions';
import OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/OverwritePersonaAttributeResult';
import Config from './Config';
import { PERSONA_ATTRIBUTES_COLLECTION } from './utils/constants/collections';
import { DUPLICATE_KEY } from './utils/constants/errorcodes';
import getPersonaById from './utils/getPersonaById';

const overwritePersonaAttribute = (config: Config) => {
  return async ({
    organisation,
    personaId,
    key,
    value,
  }: OverwritePersonaAttributeOptions): Promise<OverwritePersonaAttributeResult> => {
    const collection = (await config.db).collection(PERSONA_ATTRIBUTES_COLLECTION);

    // check persona exists
    await getPersonaById(config)({ organisation, personaId });

    try {
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
    } catch (err) {
      // if we catch a duplicate error, we can be sure to find it next time round
      /* istanbul ignore next */
      if (err instanceof MongoError && err.code === DUPLICATE_KEY) {
        /* istanbul ignore next */
        return overwritePersonaAttribute(config)({
          key,
          organisation,
          personaId,
          value,
        });
      }
      /* istanbul ignore next */
      throw err;
    }
  };
};

export default overwritePersonaAttribute;
