import GetProfileContentOptions from '../repoFactory/options/GetProfileContentOptions';
import GetProfileContentResult from '../repoFactory/results/GetProfileContentResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetProfileContentOptions): Promise<GetProfileContentResult> => {
    const profileDir = `${config.subFolder}/agentprofiles`;
    const filePath = `${profileDir}/${opts.key}`;
    const content = config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).createReadStream();
    return { content };
  };
};
