import { ObjectId } from 'mongodb';
import type SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import type SetIdentifierPersonaResult from '../repoFactory/results/SetIdentifierPersonaResult';
import type Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';
import getPersonaById from './utils/getPersonaById';

export default (config: Config) => {
  return async ({
    id,
    organisation,
    persona,
  }: SetIdentifierPersonaOptions): Promise<SetIdentifierPersonaResult> => {
    // check persona exists
    await getPersonaById(config)({ organisation, personaId: persona });

    const filter = {
      _id: new ObjectId(id),
      organisation: new ObjectId(organisation),
    };

    const update = {
      $set: {
        locked: false,
        persona: new ObjectId(persona),
      },
      $unset: {
        lockedAt: '',
      },
    };

    return await createOrUpdateIdentifier(config)({
      filter,
      update,
      upsert: false,
    }) as SetIdentifierPersonaResult;
  };
};
