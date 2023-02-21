import repoFactory from '../repoFactory';
import service from '../service';
import type Service from './Service';

export default (): Service => {
  const repoFacade = repoFactory();

  return service({
    repo: repoFacade,
  });
};
