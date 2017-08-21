import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { map, times } from 'lodash';
import NoCursorBackwardsDirection from '../../errors/NoCursorBackwardsDirection';
import Identifier from '../../models/Identifier';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import CreateIdentifierResult from '../../serviceFactory/results/CreateIdentifierResult';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_IFI,
  TEST_ORGANISATION,
} from '../utils/values';

describe('getIdentifiers', () => {
  const service = setup();

  const addTestIdentifiers = async () => {
    const persona = await createTestPersona();

    const NUM_IDENTIFERS = 12;
    const resultsPromise: Promise<CreateIdentifierResult>[] = times(NUM_IDENTIFERS,
      (i) => {
        return service.createIdentifier({
          ifi: {
            key: 'mbox',
            value: `${i}_${TEST_IFI.value}`,
          },
          organisation: TEST_ORGANISATION,
          persona: persona.id,
        });
      },
    );

    const results: ArrayLike<CreateIdentifierResult> = await Promise.all(resultsPromise);

    return map<CreateIdentifierResult, Identifier>(results, ({identifier}) => identifier );
  };

  it('Should return the first 10 items', async () => {

    // Add 12 Identifiers
    const identifiers = await addTestIdentifiers(); // tslint:disable-line

    // Get the first 10 identifiers
    const identifiersResults = await service.getIdentifiers(
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
          'ifi.value': 1,
        },
      },
    );

    const TEN = 10;
    assert.equal(identifiersResults.edges.length, TEN);

    assert.equal(identifiersResults.edges[0].node.ifi.value, '0_test@test.com');
    assert.equal(
      identifiersResults.edges[identifiersResults.edges.length - 1].node.ifi.value,
      '7_test@test.com', // sorted by string (order: 0, 10, 11, 1, 2, 3, 4 ...)
    );
    assert.equal(identifiersResults.edges[0].cursor,
      modelToCursor({
        model: {
          ifi: {
            value: '0_test@test.com',
          },
        },
        sort: {
          'ifi.value': 1,
        },
      }),
    );
    assert.equal(identifiersResults.pageInfo.startCursor, identifiersResults.edges[0].cursor);
    assert.equal(
      identifiersResults.pageInfo.endCursor,
      identifiersResults.edges[identifiersResults.edges.length - 1].cursor,
    );
    assert.equal(
      identifiersResults.pageInfo.hasPreviousPage,
      false,
    );
    assert.equal(
      identifiersResults.pageInfo.hasNextPage,
      true,
    );
  });

  it('Should return the last 2 identifiers', async () => {

    const identifiers = await addTestIdentifiers(); // tslint:disable-line

    const fromCursor = modelToCursor({
      model: {
        ifi: {
          value: '7_test@test.com',
        },
      },
      sort: {
        'ifi.value': 1,
      },
    });

    const identifiersResults = await service.getIdentifiers(
      {
        cursor: fromCursor,
        direction: CursorDirection.FORWARDS,
        filter: {},
        limit: 10,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: TEST_ORGANISATION,
        project: {},
        sort: {
          'ifi.value': 1,
        },
      },
    );

    const TWO = 2;
    assert.equal(identifiersResults.edges.length, TWO);
    assert.equal(identifiersResults.pageInfo.hasNextPage, false);
    assert.equal(identifiersResults.pageInfo.hasPreviousPage, true);
  });

  it('Should throw error when direction is BACKWARDS and cursor is undefined', async () => {
    // Add 12 Identifiers
    const identifiers = await addTestIdentifiers(); // tslint:disable-line
    
    // Get the first 10 identifiers
    const identifiersPromise = service.getIdentifiers(
      {
        cursor: undefined,
        direction: CursorDirection.BACKWARDS,
        filter: {},
        limit: 10,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: TEST_ORGANISATION,
        project: {},
        sort: {
          'ifi.value': 1,
        },
      },
    );

    return assertError(NoCursorBackwardsDirection, identifiersPromise);
  });

  it('Should return the previous 2 cursors when direction is BACKWARDS', async () => {
    // Add 12 Identifiers
    const identifiers = await addTestIdentifiers(); // tslint:disable-line
    
    const fromCursor = modelToCursor({
      model: {
        ifi: {
          value: '1_test@test.com',
        },
      },
      sort: {
        'ifi.value': 1,
      },
    });

    // Get the first 10 identifiers
    const identifiersResult = await service.getIdentifiers(
      {
        cursor: fromCursor,
        direction: CursorDirection.BACKWARDS,
        filter: {},
        limit: 10,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: TEST_ORGANISATION,
        project: {},
        sort: {
          'ifi.value': 1,
        },
      },
    );

    const THREE = 3;
    assert.equal(identifiersResult.edges.length, THREE);
    assert.equal(identifiersResult.pageInfo.hasNextPage, true);
    assert.equal(identifiersResult.pageInfo.hasPreviousPage, false);
  });

  it('should return undefiend cursor, if no identifiers', async () => {
    const identifiersResult = await service.getIdentifiers(
      {
        cursor: undefined,
        direction: CursorDirection.FORWARDS,
        filter: {},
        limit: 1,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: TEST_ORGANISATION,
        project: {},
        sort: {
          'ifi.value': 1,
        },
      },
    );

    assert.equal(identifiersResult.pageInfo.endCursor, undefined);
    assert.equal(identifiersResult.pageInfo.startCursor, undefined);
  });

  it('Should return the previous 1 cursors when limit 1', async () => {
    // Add 12 Identifiers
    const identifiers = await addTestIdentifiers(); // tslint:disable-line
    
    const fromCursor = modelToCursor({
      model: {
        ifi: {
          value: '1_test@test.com',
        },
      },
      sort: {
        'ifi.value': 1,
      },
    });

    // Get the first 10 identifiers
    const identifiersResult = await service.getIdentifiers(
      {
        cursor: fromCursor,
        direction: CursorDirection.BACKWARDS,
        filter: {},
        limit: 1,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: TEST_ORGANISATION,
        project: {},
        sort: {
          'ifi.value': 1,
        },
      },
    );

    assert.equal(identifiersResult.edges.length, 1);
    assert.equal(identifiersResult.pageInfo.hasNextPage, true);
    assert.equal(identifiersResult.pageInfo.hasPreviousPage, true);
  });

  it('should test $and clause', async () => {
    await addTestIdentifiers();

    const identifiersResult = await service.getIdentifiers(
      {
        direction: CursorDirection.FORWARDS,
        filter: {
          $and: [{
            'ifi.value': {$eq: '9_test@test.com'},
          }],
        },
        limit: 6,
        maxScan: 0,
        maxTimeMS: 0,
        organisation: TEST_ORGANISATION,
        project: {},
        sort: {
          'ifi.value': -1,
        },
      },
    );

    assert.equal(identifiersResult.edges.length, 1);
    assert.equal(identifiersResult.edges[0].node.ifi.value, '9_test@test.com');
  });
}); // tslint:disable-line: max-file-line-count
