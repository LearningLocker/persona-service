import OverwriteAgentProfileOptions from '../serviceFactory/options/OverwriteAgentProfileOptions';
import Config from './Config';

export default (_config: Config) => {
  return async (_opts: OverwriteAgentProfileOptions): Promise<void> => {
    return;
  };
};
