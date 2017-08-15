import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import GetIdentifierByIfiOptions from '../repoFactory/options/GetIdentifierByIfiOptions';
import GetIdentifierByIfiResult from '../repoFactory/results/GetIdentifierByIfiResult';
import Config from './Config';
import getIdentifierIfiFilter from './utils/getIdentifierIfiFilter';

export default (config: Config) => {
  return async (opts: GetIdentifierByIfiOptions): Promise<GetIdentifierByIfiResult> => {
    const collection = (await config.db).collection('personaIdentifiers');

    // Filters on the IFI and organisation.
    const ifiFilter = getIdentifierIfiFilter(opts.ifi);
    const filter = {
      organisation: new ObjectID(opts.organisation),
      ...ifiFilter,
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const document = await collection.findOne(filter, {});

    if (document === null || document === undefined) {
      throw new NoModel('Persona Identifier');
    }

    const identifierId = document._id.toString();
    const personaId = document.persona.toString();
    return { identifierId, personaId };
  };
};
