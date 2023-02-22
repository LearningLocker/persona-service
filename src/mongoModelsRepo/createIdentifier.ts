import { has, isPlainObject } from 'lodash';
import { MongoError, ObjectId } from 'mongodb';
import Conflict from '../errors/Conflict';
import type CreateIdentifierOptions from '../repoFactory/options/CreateIdentifierOptions';
import type CreateIdentifierResult from '../repoFactory/results/CreateIdentifierResult';
import type Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';
import { DUPLICATE_KEY } from './utils/constants/errorcodes';
import getPersonaById from './utils/getPersonaById';

export default (config: Config) => {
  return async ({
    persona,
    organisation,
    ifi,
  }: CreateIdentifierOptions): Promise<CreateIdentifierResult> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    // check persona exists
    await getPersonaById(config)({ organisation, personaId: persona });

    try {
      const orderedIfi: any = {
        key: ifi.key,
        value: null,
      };
      const ifiValue: any = ifi.value;
      if (isPlainObject(ifiValue) && has(ifiValue, 'homePage') && has(ifiValue, 'name')) {
        orderedIfi.value = {
          homePage: ifiValue.homePage,
          name: ifiValue.name,
        };
      } else {
        orderedIfi.value = ifi.value;
      }

      const result = await collection.insertOne({
        ifi: orderedIfi,
        organisation: new ObjectId(organisation),
        persona: new ObjectId(persona),
      });
      const identifierId = result.insertedId.toString();
      const identifier = {
        id: identifierId,
        ifi,
        organisation,
        persona,
      };

      return { identifier };
    } catch (err) {
      if (err instanceof MongoError && err.code === DUPLICATE_KEY) {
        throw new Conflict();
      }
      /* istanbul ignore next */
      throw err;
    }
  };
};
