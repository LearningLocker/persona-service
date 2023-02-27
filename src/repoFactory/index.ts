import config from '../config';
import mongoModelsRepo from '../mongoModelsRepo';
import type Repo from './Repo';
import createMongoClient from './utils/createMongoClient';

export default (): Repo => {
  switch (config.repoFactory.modelsRepoName) {
    case 'mongo':
    default:
      return mongoModelsRepo({
        db: createMongoClient({
          options: config.mongoModelsRepo.options,
          url: config.mongoModelsRepo.url,
        }),
      });
  }
};
