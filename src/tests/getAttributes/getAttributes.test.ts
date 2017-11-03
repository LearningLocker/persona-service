import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { assign, map, times } from 'lodash';
import NoCursorBackwardsDirection from '../../errors/NoCursorBackwardsDirection';
import Attribute from '../../models/Attribute';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import OverwritePersonaAttributeResult from // tslint:disable-line:import-spacing
  '../../serviceFactory/results/OverwritePersonaAttributeResult';
import GetOptions, { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
} from '../utils/values';

describe('getAttributes', () => {
  const service = setup();

  const getAttributesOptions = {
    direction: CursorDirection.FORWARDS,
    filter: {},
    limit: 10,
    maxScan: 0,
    maxTimeMS: 0,
    organisation: TEST_ORGANISATION,
    project: {},
    sort: {
      value: 1,
    },
  } as GetOptions;

  const fromFirstCursor = modelToCursor({
    model: {
      value: 'brown11',
    },
    sort: {
      value: 1,
    },
  });

  const addTestAttributes = async () => {
    const persona = await createTestPersona();

    const NUM_IDENTIFERS = 12;
    const resultsPromise: Promise<OverwritePersonaAttributeResult>[] = times(NUM_IDENTIFERS,
      (i) => {
        return service.overwritePersonaAttribute({
          key: `hair${i}`,
          organisation: TEST_ORGANISATION,
          personaId: persona.id,
          value: `brown${i}`,
        });
      },
    );

    const results: ArrayLike<OverwritePersonaAttributeResult> = await Promise.all(resultsPromise);

    return map<OverwritePersonaAttributeResult, Attribute>(results, ({attribute}) => attribute );
  };

  it('Should return the first 10 items', async () => {

    // Add 12 Attributes
    const attributes = await addTestAttributes(); // tslint:disable-line

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

  it('Should return the last 2 attributes', async () => {

    const attributes = await addTestAttributes(); // tslint:disable-line

    const fromCursor = modelToCursor({
      model: {
        value: 'brown7',
      },
      sort: {
        value: 1,
      },
    });

    const attributesResults = await service.getAttributes(
      assign({}, getAttributesOptions, {
        cursor: fromCursor,
      }),
    );

    const TWO = 2;
    assert.equal(attributesResults.edges.length, TWO);
    assert.equal(attributesResults.pageInfo.hasNextPage, false);
    assert.equal(attributesResults.pageInfo.hasPreviousPage, true);
  });

  it('Should throw error when direction is BACKWARDS and cursor is undefined', async () => {
    // Add 12 Attributes
    const attributes = await addTestAttributes(); // tslint:disable-line
    
    // Get the first 10 attributes
    const attributesPromise = service.getAttributes(
      assign({}, getAttributesOptions, {
        direction: CursorDirection.BACKWARDS,
      }),
    );

    return assertError(NoCursorBackwardsDirection, attributesPromise);
  });

  it('Should return the previous 2 cursors when direction is BACKWARDS', async () => {
    // Add 12 Attributes
    const attributes = await addTestAttributes(); // tslint:disable-line

    // Get the first 10 attributes
    const attributesResult = await service.getAttributes(
      assign({}, getAttributesOptions, {
        cursor: fromFirstCursor,
        direction: CursorDirection.BACKWARDS,
      }),
    );

    const THREE = 3;
    assert.equal(attributesResult.edges.length, THREE);
    assert.equal(attributesResult.pageInfo.hasNextPage, true);
    assert.equal(attributesResult.pageInfo.hasPreviousPage, false);
  });

  it('should return undefiend cursor, if no attributes', async () => {
    const attributesResult = await service.getAttributes(
      assign({}, getAttributesOptions, {
        limit: 1,
      }),
    );
    assert.equal(attributesResult.pageInfo.endCursor, undefined);
    assert.equal(attributesResult.pageInfo.startCursor, undefined);
  });

  it('Should return the previous 1 cursors when limit 1', async () => {
    const attributes = await addTestAttributes(); // tslint:disable-line
    
    // Get the first attribute
    const attributesResult = await service.getAttributes(
      assign({}, getAttributesOptions, {
        cursor: fromFirstCursor,
        direction: CursorDirection.BACKWARDS,
        limit: 1,
      }),
    );

    assert.equal(attributesResult.edges.length, 1);
    assert.equal(attributesResult.pageInfo.hasNextPage, true);
    assert.equal(attributesResult.pageInfo.hasPreviousPage, true);
  });

  it('should test $and clause', async () => {
    await addTestAttributes();

    const attributesResult = await service.getAttributes(
      assign({}, getAttributesOptions, {
        filter: {
          $and: [{
            value: {$eq: 'brown9'},
          }],
        },
        limit: 6,
        sort: {
          value: -1,
        },
      }),
    );

    assert.equal(attributesResult.edges.length, 1);
    assert.equal(attributesResult.edges[0].node.value, 'brown9');
  });
}); // tslint:disable-line: max-file-line-count
