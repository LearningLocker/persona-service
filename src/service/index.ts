import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';

export default (config: Config): Service => {
  return {
    ...commonService(config),
  };
};
