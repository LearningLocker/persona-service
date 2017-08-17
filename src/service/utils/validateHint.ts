import { flatMap } from 'lodash';
import * as rulr from 'rulr';
import { Hint } from '../../serviceFactory/utils/GetOptions';

export default (hint?: Hint) => {
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
