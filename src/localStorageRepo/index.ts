import commonFsRepo from 'jscommons/dist/fsRepo';
import StorageRepo from '../repoFactory/StorageRepo';
import Config from './Config';

export default (config: Config): StorageRepo => {
  return {
    ...commonFsRepo(config),
  };
};
