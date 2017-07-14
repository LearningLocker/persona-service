import DeleteProfileOptions from '../serviceFactory/options/DeleteProfileOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: DeleteProfileOptions): Promise<void> => {
    return;
  };
};
