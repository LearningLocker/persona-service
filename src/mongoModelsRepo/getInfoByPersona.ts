import GetInfoByPersonaOptions from '../repoFactory/options/GetInfoByPersonaOptions';
import GetInfoByPersonaResult from '../repoFactory/results/GetInfoByPersonaResult';
// tslint:disable-next-line:no-unused
import _GetInfoByPersonaOptions from '../serviceFactory/options/GetInfoByPersonaOptions';
// tslint:disable-next-line:no-unused
import _GetInfoByPersonaResult from '../serviceFactory/results/GetInfoByPersonaResult';
import Config from './Config';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
  }: GetInfoByPersonaOptions): Promise<GetInfoByPersonaResult> => {
    const collection = (await config.db).collection('info');

    const infos = await collection.aggregate([{
      $lookup: {
        as: 'persona',
        foreignField: '_id',
        from: 'personaIdentifiers',
        localField: 'identifierId',
      },
      $match: {
        person: {
          organisation,
          personaId,
        },
      },
    }]).toArray();

    console.log('infos', infos);

    return {infos};
  };
};
