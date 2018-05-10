import { ObjectID } from 'mongodb';
import SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import SetIdentifierPersonaResult from '../repoFactory/results/SetIdentifierPersonaResult';
import Config from './Config';
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
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    };

    const update = {
      $set: {
        locked: false,
        persona: new ObjectID(persona),
      },
    };

    return await createOrUpdateIdentifier(config)({
      filter,
      update,
      upsert: false,
    });
  };
};
