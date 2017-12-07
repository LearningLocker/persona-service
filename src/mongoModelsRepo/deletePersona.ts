import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import PersonaHasIdentsError from '../errors/PersonaHasIdentsError';
import DeletePersonaOptions from '../repoFactory/options/DeletePersonaOptions';
import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION, PERSONAS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({personaId, organisation}: DeletePersonaOptions): Promise<void> => {

    const collection = (await config.db).collection(PERSONAS_COLLECTION);
    const personaIdentifiersCollection = (await config.db)
    .collection(PERSONA_IDENTIFIERS_COLLECTION);

    const existingIdent = await personaIdentifiersCollection.findOne({
      organisation: new ObjectID(organisation),
      persona: new ObjectID(personaId),
    }, { fields: {_id: 1}});

    if (existingIdent) {
      throw new PersonaHasIdentsError();
    }

    const result = await collection.deleteOne({
      _id: new ObjectID(personaId),
      organisation: new ObjectID(organisation),
    });

    if (result.deletedCount === 0) {
      throw new NoModel('Persona');
    }
  };
};
