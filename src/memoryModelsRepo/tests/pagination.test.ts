import * as assert from 'assert';
import { doSort } from '../utils/pagination';

describe('memory pagination', () => {
  it('should sort stuff', () => {
    const collection = [
      {
        test1: {
          test2: 'zzz',
        },
      },
      {
        test1: {
          test2: 'aaa',
        },
      },
    ];

    const result = doSort({
      'test1.test2': 1,
    }, collection);

    assert.equal(result[0].test1.test2, 'aaa');
    assert.equal(result[1].test1.test2, 'zzz');
  });
});
