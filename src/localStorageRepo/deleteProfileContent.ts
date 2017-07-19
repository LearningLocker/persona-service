import * as fs from 'fs-extra';
import DeleteProfileContentOptions from '../repoFactory/options/DeleteProfileContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileContentOptions): Promise<void> => {
    const profileDir = `${config.storageDir}/agentprofiles`;
    const filePath = `${profileDir}/${opts.key}`;
    await fs.unlink(filePath);
  };
};
