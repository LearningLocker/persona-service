import BaseModel from '../../models/BaseModel';
import GetOptions from '../../serviceFactory/utils/GetOptions';
import PaginationResult from '../../serviceFactory/utils/PaginationResult';
import Config from '../Config';
declare const _default: (config: Config, collectionName: string) => <T extends BaseModel>({filter, limit, maxScan, maxTimeMS, cursor, direction, organisation, project, sort, hint}: GetOptions) => Promise<PaginationResult<T>>;
export default _default;
