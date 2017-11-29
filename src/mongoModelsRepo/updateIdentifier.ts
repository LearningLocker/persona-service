import { ObjectID } from 'mongodb';
import NoModelWithId from '../errors/NoModelWithId';
import UpdateIdentifierOptions from '../serviceFactory/options/UpdateIdentifierOptions';
import UpdateIdentifierResult from '../serviceFactory/results/UpdateIdentifierResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    id,
    persona,
    organisation,
    ifi,
  }: UpdateIdentifierOptions): Promise<UpdateIdentifierResult> => {
    const collection = (await config.db).collection('personaIdentifiers');

    const result = await collection.findOneAndUpdate({
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    }, {
      ifi,
      organisation: new ObjectID(organisation),
      persona,
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
      persona: result.value.persona.toString(),
    };

    return {
      identifier,
    };
  };
};
