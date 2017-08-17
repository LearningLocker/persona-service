import * as assert from 'assert';
import { CursorDirection } from '../../../serviceFactory/utils/GetOptions';
import { cursorToFilter, modelToCursor } from '../../utils/cursor';

describe('cursor', () => {

  it('Should generate a cursor from a model and sort', () => {

    const mockModel = {
      _id: 'abcdef',
      name: 'the_name',
    };
    const mockSort = {
      _id: 1,
      name: 1,
    };

    const result = modelToCursor({
      model: mockModel,
      sort: mockSort,
    });

    assert.equal(result, 'eyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==');
  });

  it('Should generate a filter from a cursor', () => {
    const mockCursor = 'eyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==';
    const mockSort = {
      _id: 1,
      name: 1,
    };

    const result = cursorToFilter({
      cursor: mockCursor,
      direction: CursorDirection.FORWARDS,
      sort: mockSort,
    });

    assert.deepEqual(result, {
      $or: [
        {_id: {$gt: 'abcdef'}},
        {_id: 'abcdef', name: {$gt: 'the_name'}},
      ],
    });
  });
});
