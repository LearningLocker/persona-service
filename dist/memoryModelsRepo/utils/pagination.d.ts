import BaseModel from '../../models/BaseModel';
import GetOptions, { Sort } from '../../serviceFactory/utils/GetOptions';
import PaginationResult from '../../serviceFactory/utils/PaginationResult';
import Config from '../Config';
export declare const doSort: <T>(sort: Sort, collection: T[]) => T[];
export declare const doesMatch: <T>(theItem: T, theFilter: object, operator?: "$or" | "$and", path?: string[]) => boolean;
declare const _default: (config: Config, collectionName: string) => <T extends BaseModel>({filter, limit, cursor, direction, organisation, sort}: GetOptions) => Promise<PaginationResult<T>>;
export default _default;
