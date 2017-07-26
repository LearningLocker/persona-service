/* tslint:disable:max-file-line-count */
import { isPlainObject } from 'lodash';
import Conflict from '../errors/Conflict';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import MaxEtags from '../errors/MaxEtags';
import OverwriteProfileOptions from '../repoFactory/options/OverwriteProfileOptions';
import OverwriteProfileResult from '../repoFactory/results/OverwriteProfileResult';
import Config from './Config';

// Within this code, Etags (ifMatch/ifNoneMatch) are used to manage concurrent creates/updates.
// Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency

export default (config: Config) => {
  return async (opts: OverwriteProfileOptions): Promise<OverwriteProfileResult> => {
    const collection = (await config.db).collection('agentProfiles');
    const checkIfMatch = opts.ifMatch !== undefined;
    const checkIfNoneMatch = opts.ifNoneMatch === '*';
    const checkConflict = opts.ifMatch === undefined && opts.ifNoneMatch === undefined;

    if (checkIfMatch && checkIfNoneMatch) {
      throw new MaxEtags();
    }

    const profileFilter = {
      lrs: opts.client.lrs_id,
      organisation: opts.client.organisation,
      personaIdentifier: opts.personaIdentifier,
      profileId: opts.profileId,
    };

    const update = {
      // Overwrites the content and contentType.
      content: opts.content,
      contentType: opts.contentType,
      etag: opts.etag,
      isObjectContent: isPlainObject(opts.content),

      // Updates updatedAt time.
      updatedAt: new Date(),
    };

    // Attempts to update the profile because the ifMatch option is provided.
    if (checkIfMatch) {
      const ifMatchFilter = { etag: opts.ifMatch };

      // Updates the profile if it exists with the correct ETag.
      // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
      // Docs: http://bit.ly/findAndModifyWriteOpResult
      const updateOpResult = await collection.findOneAndUpdate({
        ...ifMatchFilter,
        ...profileFilter,
      }, {
        $set: update,
      }, {
        returnOriginal: false, // Ensures the updated document is returned.
        upsert: false, // Does not create the profile when it doesn't exist.
      });

      // Determines if the Profile was updated.
      // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
      const updatedDocuments = updateOpResult.lastErrorObject.n as number;
      if (updatedDocuments === 1) {
        return {
          id: updateOpResult.value._id.toString(),
        };
      }
    }

    // Creates the profile if it doesn't already exist.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const createOpResult = await collection.findOneAndUpdate(profileFilter, {
      $setOnInsert: update,
    }, {
      returnOriginal: false, // Ensures the updated document is returned.
      upsert: true, // Creates the profile when it's not found.
    });

    // Determines if the Profile was created or found.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const wasCreated = createOpResult.lastErrorObject.upserted !== undefined;

    // Throws the IfMatch error when the profile already exists.
    // This is because there must have been an ETag mismatch in the previous update.
    if (!wasCreated && checkIfMatch) {
      throw new IfMatch();
    }

    if (!wasCreated && checkIfNoneMatch) {
      throw new IfNoneMatch();
    }

    if (!wasCreated && checkConflict) {
      throw new Conflict();
    }

    return {
      id: createOpResult.value._id.toString(),
    };
  };
};
