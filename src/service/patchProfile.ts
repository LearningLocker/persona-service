import PatchProfileOptions from '../serviceFactory/options/PatchProfileOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: PatchProfileOptions): Promise<void> => {
    return;
  };
};
