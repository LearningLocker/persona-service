import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoCursorBackwardsDirection from '../../errors/NoCursorBackwardsDirection';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import { addTestAttributes, fromFirstCursor, getAttributesOptions } from '../utils/getAttributes';
import setup from '../utils/setup';

describe('getAttributes forwards', () => {
  const service = setup();

  it('Should return the previous 2 cursors when direction is BACKWARDS', async () => {
    // Add 12 Attributes
    await addTestAttributes(service);

    // Get the first 10 attributes
    const attributesResult = await service.getAttributes({
      ...getAttributesOptions,
      cursor: fromFirstCursor,
      direction: CursorDirection.BACKWARDS,
    });

    const THREE = 3;
    assert.equal(attributesResult.edges.length, THREE);
    assert.equal(attributesResult.pageInfo.hasNextPage, true);
    assert.equal(attributesResult.pageInfo.hasPreviousPage, false);
  });

  it('Should throw error when direction is BACKWARDS and cursor is undefined', async () => {
    // Add 12 Attributes
    await addTestAttributes(service);
    // Get the first 10 attributes
    const attributesPromise = service.getAttributes({
      ...getAttributesOptions,
      direction: CursorDirection.BACKWARDS,
    });

    return assertError(NoCursorBackwardsDirection, attributesPromise);
  });

  it('Should return the previous 1 cursors when limit 1', async () => {
    await addTestAttributes(service);

    // Get the first attribute
    const attributesResult = await service.getAttributes({
      ...getAttributesOptions,
      cursor: fromFirstCursor,
      direction: CursorDirection.BACKWARDS,
      limit: 1,
    });

    assert.equal(attributesResult.edges.length, 1);
    assert.equal(attributesResult.pageInfo.hasNextPage, true);
    assert.equal(attributesResult.pageInfo.hasPreviousPage, true);
  });

  it('should return undefiend cursor, if no attributes', async () => {
    const attributesResult = await service.getAttributes({
      ...getAttributesOptions,
      limit: 1,
    });
    assert.equal(attributesResult.pageInfo.endCursor, undefined);
    assert.equal(attributesResult.pageInfo.startCursor, undefined);
  });

  it('Should return the last 2 attributes', async () => {
    await addTestAttributes(service);
    const fromCursor = modelToCursor({
      model: {
        value: 'brown7',
      },
      sort: {
        value: 1,
      },
    });
    const attributesResults = await service.getAttributes({
      ...getAttributesOptions,
      cursor: fromCursor,
    });
    const TWO = 2;
    assert.equal(attributesResults.edges.length, TWO);
    assert.equal(attributesResults.pageInfo.hasNextPage, false);
    assert.equal(attributesResults.pageInfo.hasPreviousPage, true);
  });
});
