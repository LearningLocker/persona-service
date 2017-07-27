import DeleteProfileContentOptions from '../repoFactory/options/DeleteProfileContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteProfileContentOptions): Promise<void> => {
    const profileDir = `${config.subFolder}/agentprofiles`;
    const filePath = `${profileDir}/${opts.key}`;
    await config.client.deleteObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
  };
};
