import { MongoClient } from 'mongodb';
import config from '../config';
import fetchAuthRepo from '../fetchAuthRepo';
import localStorageRepo from '../localStorageRepo';
import memoryModelsRepo from '../memoryModelsRepo';
import Identifier from '../models/Identifier';
import Persona from '../models/Persona';
import Profile from '../models/Profile';
import mongoModelsRepo from '../mongoModelsRepo';
import testAuthRepo from '../testAuthRepo';
import { ALL } from '../utils/scopes';
import AuthRepo from './AuthRepo';
import ModelsRepo from './ModelsRepo';
import Repo from './Repo';
import StorageRepo from './StorageRepo';

/* istanbul ignore next */
const getAuthRepo = (): AuthRepo => {
  switch (config.repoFactory.authRepoName) {
    case 'test':
      return testAuthRepo({
        client: {
          _id: 'dummy_id',
          authority: {
            mbox: 'mailto:dummy@example.com',
            objectType: 'Agent',
          },
          isTrusted: true,
          lrs_id: 'dummy_lrs_id',
          organisation: 'dummy_organisation',
          scopes: [ALL],
          title: 'dummy_title',
        },
      });
    default: case 'fetch':
      return fetchAuthRepo({
        llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
      });
  }
};

/* istanbul ignore next */
const getModelsRepo = (): ModelsRepo => {
  switch (config.repoFactory.modelsRepoName) {
    case 'mongo':
      return mongoModelsRepo({
        db: MongoClient.connect(config.mongoModelsRepo.url),
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

/* istanbul ignore next */
const getStorageRepo = (): StorageRepo => {
  switch (config.repoFactory.storageRepoName) {
    default:
    case 'local':
      return localStorageRepo(config.localStorageRepo);
  }
};

export default (): Repo => {
  const authRepo = getAuthRepo();
  const modelsRepo = getModelsRepo();
  const storageRepo = getStorageRepo();

  return {
    ...authRepo,
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await modelsRepo.clearRepo();
      await storageRepo.clearRepo();
    },
    migrate: async () => {
      await modelsRepo.migrate();
      await storageRepo.migrate();
    },
    rollback: async () => {
      await modelsRepo.rollback();
      await storageRepo.rollback();
    },
  };
};
