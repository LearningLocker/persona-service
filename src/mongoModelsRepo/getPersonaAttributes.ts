import { ObjectID } from 'mongodb';
import GetPersonaAttributesOptions from '../repoFactory/options/GetPersonaAttributesOptions';
import GetPersonaAttributesResult from '../repoFactory/results/GetPersonaAttributesResult';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesOptions from '../serviceFactory/options/GetPersonaAttributesOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesResult from '../serviceFactory/results/GetPersonaAttributesResult';
import Config from './Config';
import { PERSONA_ATTRIBUTES_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
    sort = {},
    skip = 0,
    limit = 0,
    filter = {},
  }: GetPersonaAttributesOptions): Promise<GetPersonaAttributesResult> => {
    const db = await config.db;
    const collection = db.collection(PERSONA_ATTRIBUTES_COLLECTION);

    // tslint:disable-next-line:strict-boolean-expressions
    const personaFilter = personaId ? { personaId: new ObjectID(personaId) } : {};

    const documents = collection.find({
      ...filter,
      ...personaFilter,
      organisation: new ObjectID(organisation),
    })
    .sort(sort)
    .skip(skip)
    .limit(limit);

    const formattedDocuments = documents.map((document: any) => ({
      id: document._id.toString(),
      key: document.key,
      organisation: document.organisation.toString(),
      /* istanbul ignore next */ // shouldnt be null..
      personaId: document.personaId === null ? null : document.personaId.toString(),
      value: document.value,
    }));

    const attributes = await formattedDocuments.toArray();

    return {
      attributes,
    };
  };
};
