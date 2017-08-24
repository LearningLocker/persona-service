import GetIdentifierByIfiOptions from '../serviceFactory/options/GetIdentifierByIfiOptions';
import GetIdentifierByIfiResult from '../serviceFactory/results/GetIdentifierByIfiResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetIdentifierByIfiOptions) => Promise<GetIdentifierByIfiResult>;
export default _default;
