import { Readable as ReadableStream } from 'stream';
import GetAgentProfileOptions from '../serviceFactory/options/GetAgentProfileOptions';
import GetAgentProfileResult from '../serviceFactory/results/GetAgentProfileResult';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: GetAgentProfileOptions): Promise<GetAgentProfileResult> => {
    return {
      content: new ReadableStream(),
    };
  };
};
