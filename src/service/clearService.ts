import Config from './Config';

export default (config: Config) =>
  async (): Promise<void> => {
    return config.repo.clearRepo();
  };
