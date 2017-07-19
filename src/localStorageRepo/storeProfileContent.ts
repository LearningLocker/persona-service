import * as fs from 'fs-extra';
import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    const profileDir = `${config.storageDir}/agentprofiles`;
    await fs.ensureDir(profileDir);
    await new Promise<void>((resolve, reject) => {
      const filePath = `${profileDir}/${opts.key}`;
      const writeStream = fs.createWriteStream(filePath);
      opts.content.pipe(writeStream);
      opts.content.on('end', () => {
        resolve();
      });
      opts.content.on('error', (err: any) => {
        /* istanbul ignore next */
        reject(err);
      });
    });
  };
};
