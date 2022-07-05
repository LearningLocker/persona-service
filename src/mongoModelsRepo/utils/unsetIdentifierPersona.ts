import { ObjectID } from 'mongodb';
import Identifier from '../../models/Identifier';
import Config from '../Config';
import createOrUpdateIdentifier from './createOrUpdateIdentifier';

export const unsetIdentifierPersona = (config: Config) =>
  async (idenifier: Identifier) => {
    const filter = {
      _id: new ObjectID(idenifier.id),
      organisation: new ObjectID(idenifier.organisation),
    };
    const update = {
      $unset: { persona: '' },
    };

    const { identifier: updatedIdentifier } = await createOrUpdateIdentifier(config)({
      filter,
      update,
      upsert: false,
    });

    return updatedIdentifier;
  };
