import commonMongoRepo from 'jscommons/dist/mongoRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';

export default (config: Config): ModelsRepo => {
  return {
    ...commonMongoRepo(config),
  };
};
