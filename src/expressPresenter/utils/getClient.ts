import ClientModel from '../../models/ClientModel';
import Config from '../Config';

export default async (config: Config, authToken = ''): Promise<ClientModel> => {
  const { client } = await config.service.getClient({ authToken });
  return client;
};
