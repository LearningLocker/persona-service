import * as fs from 'fs-extra';
import GetProfileContentOptions from '../repoFactory/options/GetProfileContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetProfileContentResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
    const profileDir = `${config.storageDir}/agentprofiles`;
    const filePath = `${profileDir}/${opts.key}`;
    const content = fs.createReadStream(filePath);
    return { content };
  };
};
