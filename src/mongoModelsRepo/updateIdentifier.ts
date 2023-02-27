import { ObjectId, ReturnDocument } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import type UpdateIdentifierOptions from '../serviceFactory/options/UpdateIdentifierOptions';
import type UpdateIdentifierResult from '../serviceFactory/results/UpdateIdentifierResult';
import type Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    id,
    persona,
    organisation,
  }: UpdateIdentifierOptions): Promise<UpdateIdentifierResult> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    const result = await collection.findOneAndUpdate({
      _id: new ObjectId(id),
      organisation: new ObjectId(organisation),
    },
    {
      $set: {
        persona,
      },
    }, {
      returnDocument: ReturnDocument.AFTER,
      upsert: false,
    });
    if (result.value === null || result.value === undefined) {
      throw new NoModelWithId('personaIdentifier', id);
    }

    const identifier = {
      id: result.value._id.toString(),
      ifi: result.value.ifi,
      organisation: result.value.organisation.toString(),
      persona: result.value.persona?.toString(),
    };

    return {
      identifier,
    };
  };
};
