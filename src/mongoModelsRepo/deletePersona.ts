import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import DeletePersonaOptions from '../repoFactory/options/DeletePersonaOptions';
import PersonaHasIdentsError from '../errors/PersonaHasIdentsError';
import Config from './Config';

export default (config: Config) => {
  return async ({personaId, organisation}: DeletePersonaOptions): Promise<void> => {

    const collection = (await config.db).collection('personas');
    const personaIdentifiersCollection = (await config.db).collection('personaIdentifiers');

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
