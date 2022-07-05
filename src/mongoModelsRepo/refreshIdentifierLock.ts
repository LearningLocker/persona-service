import { ObjectID } from 'mongodb';

import Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';
import Identifier from '../models/Identifier';
import { RefreshIdentifierLockOptions } from '../repoFactory/options/RefreshIdentifierLockOptions.types';

export const refreshIdentifierLock = (config: Config) =>
    async ({
        identifierId,
        organisation
    }: RefreshIdentifierLockOptions):
Promise<Identifier> => {
    const filter = {
        _id: new ObjectID(identifierId),
        organisation: new ObjectID(organisation),
    }; 

    const refreshLockedAt = {
        $set: {
            lockedAt: new Date(),
        }
    };

    const { identifier } = await createOrUpdateIdentifier(config)({
        filter,
        update: refreshLockedAt,
        upsert: false,
    });

    return identifier;
};
