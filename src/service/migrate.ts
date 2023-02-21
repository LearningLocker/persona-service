import type Config from './Config';

export default (config: Config) =>
  async () => {
    await config.repo.migrate();
  };
