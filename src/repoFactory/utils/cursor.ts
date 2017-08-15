const base64 = (i: string): string => {
  return ((new Buffer(i, 'ascii')).toString('base64'));
};

const unbase64 = (i: string): string => {
  return ((new Buffer(i, 'base64')).toString('ascii'));
};

export const toCursor = (data: string): string => {
  return base64(JSON.stringify(data));
};

export const fromCursor = (cursor: string): string|null => {
  if (cursor) {
    try {
      return JSON.parse(unbase64(cursor)) || null;
    } catch (err) {
      return null;
    }
  }
  return null;
};
