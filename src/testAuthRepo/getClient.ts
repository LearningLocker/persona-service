import GetClientOptions from '../repoFactory/options/GetClientOptions';
import GetClientResult from '../repoFactory/results/GetClientResult';
import { TEST_CLIENT } from '../tests/utils/values';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: GetClientOptions): Promise<GetClientResult> => {
    return { client: TEST_CLIENT };
  };
};
