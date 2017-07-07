import repoFactory from '../repoFactory';
import service from '../service';
import Service from './Service';

export default (): Service => {
  const repoFacade = repoFactory();

  return service({
    defaultTimeout: 1000,
    repo: repoFacade,
  });
};
