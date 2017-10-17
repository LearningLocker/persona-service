import { ObjectID } from 'mongodb';
import GetPersonaAttributesOptions from '../repoFactory/options/GetPersonaAttributesOptions';
import GetPersonaAttributesResult from '../repoFactory/results/GetPersonaAttributesResult';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesOptions from '../serviceFactory/options/GetPersonaAttributesOptions';
// tslint:disable-next-line:no-unused
import _GetPersonaAttributesResult from '../serviceFactory/results/GetPersonaAttributesResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
  }: GetPersonaAttributesOptions): Promise<GetPersonaAttributesResult> => {
    const collection = (await config.db).collection('personaAttributes');

    const attributes =
      await collection.find({ // tslint:disable-line:deprecation max-line-length - this find signature isn't deprecated
        organisation,
        personaId: new ObjectID(personaId),
      }).toArray();

    return {
      attributes,
    };
  };
};
