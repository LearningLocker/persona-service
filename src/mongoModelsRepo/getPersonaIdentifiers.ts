import { ObjectID } from 'mongodb';
import GetPersonaIdentifiersOptions from '../repoFactory/options/GetPersonaIdentifiersOptions';
import GetPersonaIdentifiersResult from '../repoFactory/results/GetPersonaIdentifiersResult';
// tslint:disable-next-line:no-unused
import _GetPersonaIdentifiersOptions from '../serviceFactory/options/GetPersonaIdentifiersOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaIdentifiersResult from '../serviceFactory/results/GetPersonaIdentifiersResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    persona,
    sort = {},
    skip = 0,
    limit = 0,
    filter = {},
  }: GetPersonaIdentifiersOptions): Promise<GetPersonaIdentifiersResult> => {
    const db = await config.db;
    const collection = db.collection('personaIdentifiers');

    const personaFilter = persona ? { persona: new ObjectID(persona) } : {};

    const documents = await collection.find({
      ...filter,
      ...personaFilter,
      organisation: new ObjectID(organisation),
    })
    .sort(sort)
    .skip(skip)
    .limit(limit);

    const formattedDocuments = documents.map((document: any) => ({
      id: document._id.toString(),
      ifi: document.ifi,
      organisation: document.organisation.toString(),
      persona: document.persona.toString(),
    }));

    const identifiers = await formattedDocuments.toArray();

    return {
      identifiers,
    };
  };
};
