import { Dictionary, get, keys, map, mapValues, pick, reduce, zipObject } from 'lodash';
import { ObjectID } from 'mongodb';
import InvalidCursor from '../../errors/InvalidCursor';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';

const base64 = (i: string): string => {
  return new Buffer(i, 'ascii').toString('base64');
};

const unbase64 = (i: string): string => {
  return new Buffer(i, 'base64').toString('ascii');
};

export const toCursor = (data: object): string => {
  return base64(JSON.stringify(data));
};

export const fromCursor = (cursor: string): object | null => {
  try {
    const parsedCursor = JSON.parse(unbase64(cursor));

    if (parsedCursor === false) {
      return null;
    }

    return mapValues(parsedCursor, (value) => {
      if (value instanceof Object && get(value, '$oid')) {
        return new ObjectID(get(value, '$oid'));
      }
      return value;
    });
  } catch {
    return null;
  }
};

const sortDirectionToOperator = (
  sortDirection: 1 | -1,
  cursorDirection: CursorDirection,
) => {
  /* istanbul ignore else  */ // This can't happen
  if (cursorDirection === CursorDirection.FORWARDS) {
    switch (sortDirection) {
      case 1:
        return '$gt';
      case -1:
        return '$lt'; // This can't happen. As requested by Ryan.
      /* istanbul ignore next */ default:
        return null;
    }
  } else if (cursorDirection === CursorDirection.BACKWARDS) {
    switch (sortDirection) {
      case 1:
        return '$lt';
      case -1:
        return '$gt'; // This can't happen. As requested by Ryan.
      /* istanbul ignore next */ default:
        return null;
    }
  } // This can't happen. As requested by Ryan.
  /* istanbul ignore next */ return null;
};

export const cursorToFilter = ({
  cursor,
  sort,
  direction,
}: {
  readonly cursor?: string;
  readonly sort: object;
  readonly direction: CursorDirection;
}): object => {
  if (cursor === undefined) {
    return {};
  }
  type ParsedCursor = { readonly [key: string]: any } | null;
  const parsedCursor: ParsedCursor = fromCursor(cursor);

  type SortDirection = 1 | -1;

  interface SortConditionsInterface {
    readonly oldKeys: string[];
    readonly conditions: any[];
  }

  const sortConditions = reduce(
    sort as Dictionary<SortDirection>,
    (
      { oldKeys, conditions }: SortConditionsInterface,
      sortValue,
      sortKey,
    ) => {
      const operator = sortDirectionToOperator(sortValue, direction);
      // { _id: 1 } >>> { _id: { $gt: 'sampleid' } }
      if (parsedCursor === null) {
        throw new InvalidCursor();
      } // This can't happen. As requested by Ryan.

      /* istanbul ignore next */ if (operator === null) {
        throw new Error('Can not happen');
      }

      const latestCondition: object = {
        [sortKey]: {
          [operator]: get(parsedCursor, sortKey, parsedCursor),
        },
      };

      const cursorValues: any[] = map<string>(oldKeys, (oldKey: string) => {
        return get(parsedCursor, oldKey);
      });

      const oldConditions = zipObject<string[]>(
        oldKeys,
        cursorValues,
      );
      const newConditions = { ...oldConditions, ...latestCondition };

      return {
        conditions: [...conditions, newConditions],
        oldKeys: [...oldKeys, sortKey],
      };
    },
    { oldKeys: [] as string[], conditions: [] } as SortConditionsInterface,
  );

  return { $or: sortConditions.conditions };
};

export const modelToCursor = ({
  model,
  sort,
}: {
  readonly model: object; // a mongo model
  readonly sort: object;
}): string => {
  const pickedFields = pick(model, keys(sort));

  return toCursor(
    mapValues(pickedFields, (pickedField: any) =>
      pickedField instanceof ObjectID ? { $oid: pickedField.toHexString() } : pickedField),
  );
}; // tslint:disable-line: max-file-line-count
