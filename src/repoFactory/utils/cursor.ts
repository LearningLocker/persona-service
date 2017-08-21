import { Dictionary, keys, map, pick, reduce, result, zipObject } from 'lodash';
import InvalidCursor from '../../errors/InvalidCursor';
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

export const fromCursor = (cursor: string): object|null => {
  try {
    const parsedCursor = JSON.parse(unbase64(cursor));
    if (parsedCursor === false) {
      return null;
    }
    return parsedCursor;
  } catch (err) {
    return null;
  }
};

const sortDirectionToOperator = (sortDirection: 1|-1, cursorDirection: CursorDirection) => {
  /* istanbul ignore else  */ // This can't happen
  if (cursorDirection === CursorDirection.FORWARDS) {
    switch (sortDirection) {
      case 1:
        return '$gt';
      case -1:
        return '$lt';
      /* istanbul ignore next */ // This can't happen. As requested by Ryan.
      default:
        return null;
    }
  } else if (cursorDirection === CursorDirection.BACKWARDS) {
    switch (sortDirection) {
      case 1:
        return '$lt';
      case -1:
        return '$gt';
      /* istanbul ignore next */ // This can't happen. As requested by Ryan.
      default:
        return null;
    }
  }
  /* istanbul ignore next */ // This can't happen. As requested by Ryan.
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
  if (cursor === undefined) {
    return {};
  }
  type ParsedCursor = {readonly [key: string]: any} | null;
  const parsedCursor: ParsedCursor = fromCursor(cursor);

  const sortConditions = reduce<
    1|-1, {readonly oldKeys: string[]; readonly conditions: any[]}
  >(
    sort as Dictionary<1|-1>,
    ({ oldKeys, conditions }, sortValue, sortKey) => {
      const operator = sortDirectionToOperator(sortValue, direction);
      // { _id: 1 } >>> { _id: { $gt: 'sampleid' } }
      if (parsedCursor === null) {
        throw new InvalidCursor();
      }

      /* istanbul ignore next */ // This can't happen. As requested by Ryan.
      if (operator === null) {
        throw new Error('Can not happen');
      }

      const latestCondition: object = { [sortKey]: { [operator]: result(
        parsedCursor,
        sortKey,
        parsedCursor,
      )}};
      const oldConditions = zipObject<string[], object>(
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
  const data = pick<object, object>(model, keys(sort));
  const cursor = toCursor(data);
  return cursor;
}; // tslint:disable-line: max-file-line-count
