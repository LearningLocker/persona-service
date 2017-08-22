import Identifier from '../models/Persona';
import GetOptions from '../serviceFactory/utils/GetOptions';
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetOptions) => Promise<PaginationResult<Identifier>>;
export default _default;
