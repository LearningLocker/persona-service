import { map } from 'lodash';
import Ifi from '../models/Ifi';
import Info from '../models/Info';
import CreateInfoOptions from '../repoFactory/options/CreateInfoOptions';
import CreateInfoResult from '../repoFactory/results/CreateInfoResult';
// tslint:disable-next-line:no-unused
import _CreateInfoOptions from '../serviceFactory/options/CreateInfoOptions';
// tslint:disable-next-line:no-unused
import _CreateInfoResult from '../serviceFactory/results/CreateInfoResult';
import GetIdentifierByIfiResult from '../serviceFactory/results/GetIdentifierByIfiResult';
import Config from './Config';
import getIdentifierByIfi from './getIdentifierByIfi';
import getIfisByPersona from './getIfisByPersona';

export default (config: Config) => {
  return async ({
    organisation,
    personaId,
    key,
    value,
  }: CreateInfoOptions): Promise<CreateInfoResult> => {

    const collection = (await config.db).collection('info');

    const { ifis } = await getIfisByPersona(config)({
      organisation,
      personaId,
    });

    const identifiers: GetIdentifierByIfiResult[] =
      await Promise.all<GetIdentifierByIfiResult>(map(ifis, (ifi: Ifi) => {
        return getIdentifierByIfi(config)({
          ifi,
          organisation,
        });
      }));

    const identifierIds: string[] = map(identifiers, ({identifierId}) => identifierId);

    const docsToInsert = map(identifierIds, (identifierId) => {
      return {
        identifierId,
        key,
        value,
      };
    });

    const insertedDocs = await Promise.all<Info>(map(docsToInsert, async ({
      identifierId,
      key: insertKey,
      value: insertValue,
    }) => {
      const query = await collection.findOneAndUpdate({
        identifierId,
        key,
        value,
      }, {
        identifierId,
        key: insertKey,
        value: insertValue,
      }, {
        returnOriginal: false,
        upsert: true,
      });

      return query.value;
    }));

    return {
      infos: insertedDocs,
    };
  };
};
