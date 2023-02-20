import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectId } from 'mongodb';
import PersonaHasIdentsError from '../errors/PersonaHasIdentsError';
import DeletePersonaOptions from '../repoFactory/options/DeletePersonaOptions';
import Config from './Config';
import {
  PERSONA_ATTRIBUTES_COLLECTION,
  PERSONA_IDENTIFIERS_COLLECTION,
  PERSONAS_COLLECTION,
} from './utils/constants/collections';

export default (config: Config) => {
  return async ({personaId, organisation}: DeletePersonaOptions): Promise<void> => {
    const db = await config.db;

    const collection = db.collection(PERSONAS_COLLECTION);
    const personaIdentifiersCollection = db.collection(PERSONA_IDENTIFIERS_COLLECTION);
    const personaAttributesCollection = db.collection(PERSONA_ATTRIBUTES_COLLECTION);

    const orgFilter = {
      organisation: new ObjectId(organisation),
    };
    const personaObjectId = new ObjectId(personaId);

    const existingIdent = await personaIdentifiersCollection
      .findOne({
          ...orgFilter,
          persona: personaObjectId,
        },
        {
          projection: {_id: 1},
        },
      );

    if (existingIdent) {
      throw new PersonaHasIdentsError();
    }

    // remove all attributes
    await personaAttributesCollection.deleteMany({
      ...orgFilter,
      personaId: personaObjectId,
    });

    const result = await collection.deleteOne({
      ...orgFilter,
      _id: personaObjectId,
    });

    if (result.deletedCount === 0) {
      throw new NoModel('Persona');
    }
  };
};
