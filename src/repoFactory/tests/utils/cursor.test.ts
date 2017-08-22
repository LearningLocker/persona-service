import * as assert from 'assert';
import InvalidCursor from '../../../errors/InvalidCursor';
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
      name: -1,
    };

    const result = cursorToFilter({
      cursor: mockCursor,
      direction: CursorDirection.FORWARDS,
      sort: mockSort,
    });

    assert.deepEqual(result, {
      $or: [
        {_id: {$gt: 'abcdef'}},
        {_id: 'abcdef', name: {$lt: 'the_name'}},
      ],
    });
  });

  it('Should generate a filter from a null cursor', () => {
    const mockSort = {
      _id: 1,
      name: -1,
    };

    try {
      cursorToFilter({
        cursor: 'bnVsbA==', // base64 encoded null.
        direction: CursorDirection.FORWARDS,
        sort: mockSort,
      });
      /* istanbul ignore next */
      assert.equal(true, false, 'Should not happen');
    }catch (err) {
      assert.equal(!!err, true);
    }
  });

  it('Should generate a filter from a cursor backwords', () => {
    const mockCursor = 'eyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==';
    const mockSort = {
      _id: 1,
      name: -1,
    };

    const result = cursorToFilter({
      cursor: mockCursor,
      direction: CursorDirection.BACKWARDS,
      sort: mockSort,
    });

    assert.deepEqual(result, {
      $or: [
        {_id: {$lt: 'abcdef'}},
        {_id: 'abcdef', name: {$gt: 'the_name'}},
      ],
    });
  });

  it('Should handle invalid cursors as empty', () => {
    const mockCursor = 'invalideyJfaWQiOiJhYmNkZWYiLCJuYW1lIjoidGhlX25hbWUifQ==';
    try {
      cursorToFilter({
        cursor: mockCursor,
        direction: CursorDirection.FORWARDS,
        sort: {
          _id: 1,
          name: 1,
        },
      });
      /* istanbul ignore next */
      assert.equal(true, false, 'should not happen');
    } catch (err) {
      assert.equal(err.constructor, InvalidCursor);
    }
  });

  it('Should handle invalid cursors as false', () => {
    const mockCursor = 'ZmFsc2U==';
    try {
      cursorToFilter({
        cursor: mockCursor,
        direction: CursorDirection.FORWARDS,
        sort: {
          _id: 1,
          name: 1,
        },
      });
      /* istanbul ignore next */
      assert.equal(true, false, 'should not happen');
    } catch (err) {
      assert.equal(err.constructor, InvalidCursor);
    }
  });
}); // tslint:disable-line: max-file-line-count
