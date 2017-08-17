import { Dictionary, keys, map, pick, reduce, result, zipObject } from 'lodash';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';

const base64 = (i: string): string => {
  return ((new Buffer(i, 'ascii')).toString('base64'));
};

const unbase64 = (i: string): string => {
  return ((new Buffer(i, 'base64')).toString('ascii'));
};

export const toCursor = (data: object): string => {
  return base64(JSON.stringify(data));
};

export const fromCursor = (cursor?: string): object|null => {
  if (cursor) {
    try {
      return JSON.parse(unbase64(cursor)) || null;
    } catch (err) {
      return null;
    }
  }
  return null;
};

const sortDirectionToOperator = (sortDirection: 1|-1, cursorDirection: CursorDirection) => {
  if (cursorDirection === CursorDirection.FORWARDS) {
    switch (sortDirection) {
      case 1:
        return '$gt';
      case -1:
        return '$lt';
      default:
        return null;
    }
  } else if (cursorDirection === CursorDirection.BACKWARDS) {
    switch (sortDirection) {
      case 1:
        return '$lt';
      case -1:
        return '$gt';
      default:
        return null;
    }
  }
  return null;
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
  if (!cursor) {
    return {};
  }
  const parsedCursor: {readonly [key: string]: any} | null = fromCursor(cursor);
  const sortConditions = reduce<
    1|-1, {readonly oldKeys: string[]; readonly conditions: any[]}
  >(
    sort as Dictionary<1|-1>,
    ({ oldKeys, conditions }, sortValue, sortKey) => {
      const operator = sortDirectionToOperator(sortValue, direction);
      // { _id: 1 } >>> { _id: { $gt: 'sampleid' } }
      if (operator === null || parsedCursor === null) {
        return {oldKeys, conditions};
      }

      const latestCondition: object = { [sortKey]: { [operator]: result(parsedCursor, sortKey) } };
      const oldConditions = zipObject(
        oldKeys,
        map(oldKeys, (oldKey) => result(parsedCursor, oldKey)),
      );
      const newConditions = {...oldConditions, ...latestCondition};

      return {
        conditions: [...conditions, newConditions],
        oldKeys: [...oldKeys, sortKey],
      };
    },
    { oldKeys: [], conditions: [] },
  );

  const out = { $or: sortConditions.conditions };

  return out;
};

export const modelToCursor = ({
  model,
  sort,
}: {
  readonly model: object;
  readonly sort: object;
}): string => {
  const data = pick(model, keys(sort));
  const cursor = toCursor(data);
  return cursor;
}; // tslint:disable-line: max-file-line-count
