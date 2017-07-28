import StoreProfileContentOptions from '../repoFactory/options/StoreProfileContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreProfileContentOptions): Promise<void> => {
    const profileDir = `${config.subFolder}/agentprofiles`;
    const filePath = `${profileDir}/${opts.key}`;
    await config.client.upload({
      Body: opts.content,
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
  };
};
