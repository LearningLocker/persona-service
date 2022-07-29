import NoModel from 'jscommons/dist/errors/NoModel';
import GetIdentifierByIfiOptions from '../repoFactory/options/GetIdentifierByIfiOptions';
import GetIdentifierByIfiResult from '../repoFactory/results/GetIdentifierByIfiResult';
import Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';
import getIdentifierIfiFilter from './utils/getIdentifierIfiFilter';

export default (config: Config) => {
  return async (opts: GetIdentifierByIfiOptions): Promise<GetIdentifierByIfiResult> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    // Filters on the IFI and organisation.
    const filter = getIdentifierIfiFilter(opts.ifi, opts.organisation);

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const document = await collection.findOne(filter, {});

    if (document === null || document === undefined) {
      throw new NoModel('Persona Identifier');
    }

    const identifierId = document._id.toString();
    const personaId = document.persona?.toString();
    return { identifierId, personaId };
  };
};
