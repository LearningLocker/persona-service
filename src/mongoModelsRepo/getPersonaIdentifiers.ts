import { ObjectId, Sort } from 'mongodb';
import GetPersonaIdentifiersOptions from '../repoFactory/options/GetPersonaIdentifiersOptions';
import GetPersonaIdentifiersResult from '../repoFactory/results/GetPersonaIdentifiersResult';
import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

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
    const collection = db.collection(PERSONA_IDENTIFIERS_COLLECTION);

    // tslint:disable-next-line:strict-boolean-expressions
    const personaFilter = persona ? { persona: new ObjectId(persona) } : {};

    const documents = collection
      .find({
        ...filter,
        ...personaFilter,
        organisation: new ObjectId(organisation),
      })
      .sort(sort as Sort)
      .skip(skip)
      .limit(limit);

    const formattedDocuments = documents.map((document: any) => ({
      id: document._id.toString(),
      ifi: document.ifi,
      organisation: document.organisation.toString(),
      persona: document.persona?.toString(),
    }));

    const identifiers = await formattedDocuments.toArray();

    return {
      identifiers,
    };
  };
};
