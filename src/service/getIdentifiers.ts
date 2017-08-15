import { flatMap } from 'lodash';
import * as rulr from 'rulr';
import Identifier from '../models/Identifier';
import GetIdentifiersOptions from '../serviceFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../serviceFactory/results/GetIdentifiersResult';
import GetOptions, { Hint } from '../serviceFactory/utils/GetOptions';
import PaginationResult from '../serviceFactory/utils/PaginationResult';
import Config from './Config';
import validateHint from './utils/validateHint';

export default (config: Config) => {
  return async (opts: GetIdentifiersOptions): Promise<GetIdentifiersResult> => {
    validateHint(opts.hint);
    return config.repo.getIdentifiers(opts);
  };
};
