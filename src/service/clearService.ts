import type Config from './Config';

export default (config: Config) =>
  async (): Promise<void> => {
    await config.repo.clearRepo();
  };
