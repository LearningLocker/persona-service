import NoModel from 'jscommons/dist/errors/NoModel';
import { defaultTo } from 'lodash';
import GetProfileOptions from '../repoFactory/options/GetProfileOptions';
import GetProfileResult from '../repoFactory/results/GetProfileResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfileOptions): Promise<GetProfileResult> => {
    const collection = (await config.db).collection('agentProfiles');

    const filter = {
      lrs: opts.client.lrs_id,
      organisation: opts.client.organisation,
      personaIdentifier: opts.personaIdentifier,
      profileId: opts.profileId,
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const document = await collection.findOne(filter);

    if (document === null || document === undefined) {
      /* istanbul ignore next */
      throw new NoModel('Agent Profile');
    }

    return {
      content: defaultTo<any>(document.content, undefined),
      contentType: document.contentType,
      etag: document.etag,
      id: document._id.toString(),
      updatedAt: document.updatedAt,
    };
  };
};
