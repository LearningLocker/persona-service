import { MongoClient } from 'mongodb';
import config from '../config';
import memoryModelsRepo from '../memoryModelsRepo';
import Attributes from '../models/Attribute';
import Identifier from '../models/Identifier';
import Persona from '../models/Persona';
import mongoModelsRepo from '../mongoModelsRepo';
import Repo from './Repo';

export default (): Repo => {
  switch (config.repoFactory.modelsRepoName) {
    case 'mongo':
      return mongoModelsRepo({
        db: MongoClient.connect(
          config.mongoModelsRepo.url,
          config.mongoModelsRepo.options,
        ),
      });
    default: case 'memory':
      return memoryModelsRepo({
        state: {
          personaAttributes: [] as Attributes[],
          personaIdentifiers: [] as Identifier[],
          personas: [] as Persona[],
        },
      });
  }
};
