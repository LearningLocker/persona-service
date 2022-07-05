import { ObjectID } from 'mongodb';

import Identifier from '../models/Identifier';
import { RefreshIdentifierLockOptions } from '../repoFactory/options/RefreshIdentifierLockOptions.types';
import Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';

export const refreshIdentifierLock = (config: Config) =>
    async ({
        identifierId,
        organisation,
    }: RefreshIdentifierLockOptions):
Promise<Identifier> => {
    const filter = {
        _id: new ObjectID(identifierId),
        organisation: new ObjectID(organisation),
    };

    const refreshLockedAt = {
        $set: {
            lockedAt: new Date(),
        },
    };

    const { identifier } = await createOrUpdateIdentifier(config)({
        filter,
        update: refreshLockedAt,
        upsert: false,
    });

    return identifier;
};
