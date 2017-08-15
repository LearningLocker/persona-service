import { flatMap } from 'lodash';
import * as rulr from 'rulr';
import Identifier from '../../models/Identifier';
import GetIdentifiersOptions from '../../serviceFactory/options/GetIdentifiersOptions';
import GetIdentifiersResult from '../../serviceFactory/results/GetIdentifiersResult';
import GetOptions, { Hint } from '../../serviceFactory/utils/GetOptions';
import PaginationResult from '../../serviceFactory/utils/PaginationResult';
import Config from '../Config';

export default (hint: Hint) => {
  rulr.maybe(
    rulr.first(rulr.checkType(Object), (data, path) => {
      const warnings = flatMap(data, (value: any, key: any) => {
        const keyWarnings = rulr.checkType(String)(key, path);
        const valueWarnings = value === 1 || value === -1 ? [] : [
          rulr.createWarning(value, [...path, key]),
        ];
        return [...keyWarnings, ...valueWarnings];
      });
      return warnings;
    }),
  )(hint, ['hint']);
};
