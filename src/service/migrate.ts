import Config from './Config';

export default (config: Config) =>
  async () => {
    return config.repo.migrate();
  };
