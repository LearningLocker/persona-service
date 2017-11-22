import { ObjectID } from 'mongodb';
import GetPersonaAttributeCountOptions from // tslint:disable-line:import-spacing
  '../repoFactory/options/GetPersonaAttributeCountOptions';
import GetPersonaAttributeCountResult from // tslint:disable-line:import-spacing
  '../repoFactory/results/GetPersonaAttributeCountResult';
// tslint:disable-next-line:no-unused import-spacing
import _GetPersonaAttributeCountOptions from
  '../serviceFactory/options/GetPersonaAttributeCountOptions';
// tslint:disable-next-line:no-unused import-spacing
import _GetPersonaAttributeCountResult from
  '../serviceFactory/results/GetPersonaAttributeCountResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    filter,
    organisation,
  }: GetPersonaAttributeCountOptions): Promise<GetPersonaAttributeCountResult> => {
    const collection = (await config.db).collection('personaAttributes');

    const result = await collection.count({
      ...filter,
      organisation: new ObjectID(organisation),
    });

    return {
      count: result,
    };
  };
};
