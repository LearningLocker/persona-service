import NoModel from 'jscommons/dist/errors/NoModel';
import IfMatch from '../errors/IfMatch';
import DeleteProfileOptions from '../repoFactory/options/DeleteProfileOptions';
import DeleteProfileResult from '../repoFactory/results/DeleteProfileResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileOptions): Promise<DeleteProfileResult> => {
    const collection = (await config.db).collection('agentProfiles');

    // Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency
    const etagFilter = (
      opts.ifMatch !== undefined
      ? { etag: opts.ifMatch }
      : {}
    );

    const profileFilter = {
      lrs: opts.client.lrs_id,
      organisation: opts.client.organisation,
      personaIdentifier: opts.personaIdentifier,
      profileId: opts.profileId,
    };

    // Deletes the document if it matches the profile and etag filters.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndDelete
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const opResult = await collection.findOneAndDelete({
      ...profileFilter,
      ...etagFilter,
    }, {});

    // Determines if the identifier was deleted.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const matchedDocuments = opResult.lastErrorObject.n as number;
    const wasDeleted = matchedDocuments === 1;

    // Returns the result of the deletion if the document was deleted.
    if (wasDeleted) {
      const deletedDoc = opResult.value;
      return {
        contentType: deletedDoc.contentType,
        id: deletedDoc._id.toString(),
      };
    }

    // Attempts to find document without the ETag filter to determine if there was an ETag error.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const foundDoc = await collection.findOne(profileFilter, {});
    if (foundDoc !== null && foundDoc !== undefined) {
      throw new IfMatch();
    }

    /* istanbul ignore next */
    throw new NoModel('Agent Profile');
  };
};
