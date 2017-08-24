import { ObjectID } from 'mongodb';
import SetIdentifierPersonaOptions from '../repoFactory/options/SetIdentifierPersonaOptions';
import SetIdentifierPersonaResult from '../repoFactory/results/SetIdentifierPersonaResult';
import Config from './Config';
import createOrUpdateIdentifier from './utils/createOrUpdateIdentifier';

export default (config: Config) => {
  return async ({
    id,
    organisation,
    persona,
    locked,
  }: SetIdentifierPersonaOptions): Promise<SetIdentifierPersonaResult> => {

    const filter = {
      _id: new ObjectID(id),
      organisation: new ObjectID(organisation),
    };

    const update = {
      $set: {
        locked,
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
