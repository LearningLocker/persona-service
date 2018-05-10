import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import UpdateIdentifierOptions from '../serviceFactory/options/UpdateIdentifierOptions';
import UpdateIdentifierResult from '../serviceFactory/results/UpdateIdentifierResult';
import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    id,
    persona,
    organisation,
  }: UpdateIdentifierOptions): Promise<UpdateIdentifierResult> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    const result = await collection.findOneAndUpdate({
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    },
    {
      $set: {
        persona,
      },
    }, {
      returnOriginal: false,
      upsert: false,
    });
    if (result.value === null || result.value === undefined) {
      throw new NoModelWithId('personaIdentifier', id);
    }

    const identifier = {
      id: result.value._id.toString(),
      ifi: result.value.ifi,
      organisation: result.value.organisation.toString(),
      /* istanbul ignore next */ // shouldnt be null..
      persona: result.value.persona === null ? null : result.value.persona.toString(),
    };

    return {
      identifier,
    };
  };
};
