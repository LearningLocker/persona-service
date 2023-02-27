import setupService from 'jscommons/dist/tests/utils/setupService';
import type Service from '../../serviceFactory/Service';
import service from '../../tester';

const setup = setupService(service);

export default (): Service => {
  return setup();
};
