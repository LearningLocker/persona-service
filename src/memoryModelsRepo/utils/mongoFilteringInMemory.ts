/* eslint-disable no-use-before-define */
import { flattenDeep } from 'lodash';
import sift from 'sift';

sift.use({
  $comment: () => true,
});

const match = (filter: object) => <T>(actual: T | T[]): T[] =>
  sift(filter, flattenDeep([actual])) as T[];

export default match;
