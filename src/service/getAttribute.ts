// tslint:disable-next-line:no-unused
import _GetAttributeOptions from '../serviceFactory/options/GetAttributeOptions';
// tslint:disable-next-line:no-unused
import _GetAttributeResult from '../serviceFactory/results/GetAttributeResult';
import Config from './Config';

export default (config: Config) => config.repo.getAttribute;
