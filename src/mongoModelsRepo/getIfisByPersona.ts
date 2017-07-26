/* tslint:disable:deprecation - find isn't really deprecated */
import GetIfisByPersonaOptions from '../repoFactory/options/GetIfisByPersonaOptions';
import GetIfisByPersonaResult from '../repoFactory/results/GetIfisByPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetIfisByPersonaOptions): Promise<GetIfisByPersonaResult> => {
    const collection = (await config.db).collection('personaIdentifiers');

    // Finds all Persona Identifiers matching the personaId.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const documents = await collection.find({
      persona: opts.personaId,
    }).toArray();

    // Retrieves the IFI from the documents for the result.
    const ifis = documents.map((document) => {
      return document.ifi;
    });

    return { ifis };
  };
};
