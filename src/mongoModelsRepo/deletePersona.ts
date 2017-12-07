import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
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

    const collection = (await config.db).collection(PERSONAS_COLLECTION);
    const personaIdentifiersCollection = (await config.db)
    .collection(PERSONA_IDENTIFIERS_COLLECTION);
    const personaAttributesCollection = (await config.db)
    .collection(PERSONA_ATTRIBUTES_COLLECTION);

    const orgFilter = {
      organisation: new ObjectID(organisation),
    };
    const personaObjectID = new ObjectID(personaId);

    const existingIdent = await personaIdentifiersCollection.findOne({
      ...orgFilter,
      persona: personaObjectID,
    }, { fields: {_id: 1}});

    if (existingIdent) {
      throw new PersonaHasIdentsError();
    }

    // remove all attributes
    await personaAttributesCollection.deleteMany({
      ...orgFilter,
      personaId: personaObjectID,
    });

    const result = await collection.deleteOne({
      ...orgFilter,
      _id: personaObjectID,
    });

    if (result.deletedCount === 0) {
      throw new NoModel('Persona');
    }
  };
};
