import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';

import { IDENTIFIER_LOCK_EXPIRATION_MS } from '../config';
import { ExpiredLock } from '../errors/ExpiredLock';
import type Identifier from '../models/Identifier';
import type GetIdentifierOptions from '../repoFactory/options/GetIdentifierOptions';
import type GetIdentifierResult from '../repoFactory/results/GetIdentifierResult';
import type Lockable from '../repoFactory/utils/Lockable';
import type Config from './Config';
import { PERSONA_IDENTIFIERS_COLLECTION } from './utils/constants/collections';

export default (config: Config) => {
  return async (opts: GetIdentifierOptions): Promise<GetIdentifierResult & Lockable> => {
    const collection = (await config.db).collection(PERSONA_IDENTIFIERS_COLLECTION);

    const filter = {
      _id: new ObjectID(opts.id),
      organisation: new ObjectID(opts.organisation),
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const document = await collection.findOne(filter, {});

    if (document === null || document === undefined) {
      throw new NoModel('Identifier');
    }

    const identifier: Identifier = {
      id: document._id.toString(),
      ifi: document.ifi,
      organisation: document.organisation.toString(),
      persona: document.persona?.toString(),
    };

    const lockAge = (new Date()).getTime() - (document.lockedAt?.getTime() ?? 0);

    if (document.locked && lockAge > IDENTIFIER_LOCK_EXPIRATION_MS) {
      throw new ExpiredLock(identifier, document.lockedAt === undefined);
    }

    return { identifier, locked: document.locked };
  };
};
