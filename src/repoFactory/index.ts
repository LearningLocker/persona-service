import { MongoClient } from 'mongodb';
import config from '../config';
import memoryModelsRepo from '../memoryModelsRepo';
import Identifier from '../models/Identifier';
import Persona from '../models/Persona';
import Profile from '../models/Profile';
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
          agentProfiles: [] as Profile[],
          personaIdentifiers: [] as Identifier[],
          personas: [] as Persona[],
        },
      });
  }
};
