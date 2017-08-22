import Identifier from '../models/Identifier';
import GetOptions from '../serviceFactory/utils/GetOptions';
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetOptions) => Promise<PaginationResult<Identifier>>;
export default _default;
