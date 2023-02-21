import * as assert from 'assert';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import { addTestAttributes, getAttributesOptions } from '../utils/getAttributes';
import setup from '../utils/setup';
import { TEST_ORGANISATION } from '../utils/values';

describe('getAttributes forwards', () => {
  const service = setup();

  it('Should return the first 10 items', async () => {
    await addTestAttributes(service); // Add 12 Attributes

    // Get the first 10 attributes
    const attributesResults = await service.getAttributes(
      {
        cursor: undefined,
        direction: CursorDirection.FORWARDS,
        filter: {},
        hint: {
        },
        limit: 10,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: TEST_ORGANISATION,
        project: {},
        sort: {
          value: 1,
        },
      },
    );
    const TEN = 10;
    assert.equal(attributesResults.edges.length, TEN);
    assert.equal(attributesResults.edges[0].node.value, 'brown0');
    assert.equal(
      attributesResults.edges[attributesResults.edges.length - 1].node.value,
      'brown7', // sorted by string (order: 0, 10, 11, 1, 2, 3, 4 ...)
    );
    assert.equal(attributesResults.edges[0].cursor,
      modelToCursor({
        model: {
          value: 'brown0',
        },
        sort: {
          value: 1,
        },
      }),
    );
    assert.equal(attributesResults.pageInfo.startCursor, attributesResults.edges[0].cursor);
    assert.equal(
      attributesResults.pageInfo.endCursor,
      attributesResults.edges[attributesResults.edges.length - 1].cursor,
    );
    assert.equal(
      attributesResults.pageInfo.hasPreviousPage,
      false,
    );
    assert.equal(
      attributesResults.pageInfo.hasNextPage,
      true,
    );
  });

  it('should test $and clause', async () => {
    await addTestAttributes(service);

    const attributesResult = await service.getAttributes({
      ...getAttributesOptions,
      filter: {
        $and: [{
          value: { $eq: 'brown9' },
        }],
      },
      limit: 6,
      sort: {
        value: -1,
      },
    });
    assert.equal(attributesResult.edges.length, 1);
    assert.equal(attributesResult.edges[0].node.value, 'brown9');
  });
});
