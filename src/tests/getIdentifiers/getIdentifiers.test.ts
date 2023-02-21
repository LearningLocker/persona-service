import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { assign } from 'lodash';
import { ObjectId } from 'mongodb';
import NoCursorBackwardsDirection from '../../errors/NoCursorBackwardsDirection';
import type Identifier from '../../models/Identifier';
import type Persona from '../../models/Persona';
import { modelToCursor } from '../../repoFactory/utils/cursor';
import type GetOptions from '../../serviceFactory/utils/GetOptions';
import { CursorDirection } from '../../serviceFactory/utils/GetOptions';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_IFI,
  TEST_ORGANISATION,
} from '../utils/values';

describe('getIdentifiers', () => {
  const service = setup();

  const getIdentifiersOptions = {
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
  } as GetOptions;

  const fromFirstCursor = modelToCursor({
    model: {
      ifi: {
        value: '1_test@test.com',
      },
    },
    sort: {
      'ifi.value': 1,
    },
  });

  const getMboxFromPersona = (persona: Persona, index: number) => `${persona.name?.replace(/\s/g, '_')}_${index}@test.com`;

  const addTestIdentifiers = async (
    customPersona?: Persona,
    amount = 12,
  ): Promise<Identifier[]> => {
    const persona = customPersona === undefined
      ? await createTestPersona()
      : customPersona;
    const results = [];

    for (let i = 0; i < amount; i++) {
      results.push(
        await service.createIdentifier({
          ifi: {
            key: 'mbox',
            value: customPersona === undefined
              ? `${i}_${TEST_IFI.value}`
              : getMboxFromPersona(persona, i),
          },
          organisation: TEST_ORGANISATION,
          persona: persona.id,
        }),
      );
    }

    return results.map((result) => result.identifier);
  };

  it('Should return the first 10 items', async () => {
    // Add 12 Identifiers
    const identifiers = await addTestIdentifiers();
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
    const identifiers = await addTestIdentifiers();
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
      assign({}, getIdentifiersOptions, {
        cursor: fromCursor,
      }),
    );

    const TWO = 2;
    assert.equal(identifiersResults.edges.length, TWO);
    assert.equal(identifiersResults.pageInfo.hasNextPage, false);
    assert.equal(identifiersResults.pageInfo.hasPreviousPage, true);
  });

  it('Should throw error when direction is BACKWARDS and cursor is undefined', async () => {
    // Add 12 Identifiers
    const identifiers = await addTestIdentifiers();
    // Get the first 10 identifiers
    const identifiersPromise = service.getIdentifiers(
      assign({}, getIdentifiersOptions, {
        direction: CursorDirection.BACKWARDS,
      }),
    );

    await assertError(NoCursorBackwardsDirection, identifiersPromise);
  });

  it('Should return the previous 2 cursors when direction is BACKWARDS', async () => {
    // Add 12 Identifiers
    const identifiers = await addTestIdentifiers();
    // Get the first 10 identifiers
    const identifiersResult = await service.getIdentifiers(
      assign({}, getIdentifiersOptions, {
        cursor: fromFirstCursor,
        direction: CursorDirection.BACKWARDS,
      }),
    );

    const THREE = 3;
    assert.equal(identifiersResult.edges.length, THREE);
    assert.equal(identifiersResult.pageInfo.hasNextPage, true);
    assert.equal(identifiersResult.pageInfo.hasPreviousPage, false);
  });

  it('should return undefined cursor, if no identifiers', async () => {
    const identifiersResult = await service.getIdentifiers(
      assign({}, getIdentifiersOptions, {
        limit: 1,
      }),
    );
    assert.equal(identifiersResult.pageInfo.endCursor, undefined);
    assert.equal(identifiersResult.pageInfo.startCursor, undefined);
  });

  it('Should return the previous 1 cursors when limit 1', async () => {
    const identifiers = await addTestIdentifiers();
    // Get the first identifier
    const identifiersResult = await service.getIdentifiers(
      assign({}, getIdentifiersOptions, {
        cursor: fromFirstCursor,
        direction: CursorDirection.BACKWARDS,
        limit: 1,
      }),
    );

    assert.equal(identifiersResult.edges.length, 1);
    assert.equal(identifiersResult.pageInfo.hasNextPage, true);
    assert.equal(identifiersResult.pageInfo.hasPreviousPage, true);
  });

  it('should test $and clause', async () => {
    await addTestIdentifiers();

    const identifiersResult = await service.getIdentifiers(
      assign({}, getIdentifiersOptions, {
        filter: {
          $and: [{
            'ifi.value': { $eq: '9_test@test.com' },
          }],
        },
        limit: 6,
        sort: {
          'ifi.value': -1,
        },
      }),
    );

    assert.equal(identifiersResult.edges.length, 1);
    assert.equal(identifiersResult.edges[0].node.ifi.value, '9_test@test.com');
  });

  it('should properly use combination of filter with $or and cursor', async () => {
    const firstPersona = await createTestPersona('Test Persona 1');
    const secondPersona = await createTestPersona('Test Persona 2');
    const thirdPersona = await createTestPersona('Test Persona 3');

    const pageSize = 3;

    await addTestIdentifiers(firstPersona, 2);
    await addTestIdentifiers(secondPersona, 2);
    await addTestIdentifiers(thirdPersona, 1);

    const filter = {
      $or: [
        {
          persona: new ObjectId(firstPersona.id),
        },
        {
          persona: new ObjectId(secondPersona.id),
        },
      ],
    };

    const queryOptions: GetOptions = {
      ...getIdentifiersOptions,
      filter,
      limit: pageSize,
      sort: { _id: 1 },
    };

    const firstPageResult = await service.getIdentifiers(queryOptions);

    assert.equal(firstPageResult.edges.length, pageSize);
    assert.equal(firstPageResult.pageInfo.hasNextPage, true);
    assert.equal(firstPageResult.pageInfo.hasPreviousPage, false);

    assert.equal(
      firstPageResult.edges.map((edge) => edge.node.ifi.value).join(','),
      [
        getMboxFromPersona(firstPersona, 0),
        getMboxFromPersona(firstPersona, 1),
        getMboxFromPersona(secondPersona, 0),
      ].join(','),
    );

    const secondPageResult = await service.getIdentifiers({
      ...queryOptions,
      cursor: firstPageResult.pageInfo.endCursor,
    });

    assert.equal(secondPageResult.edges.length, 1);
    assert.equal(secondPageResult.pageInfo.hasNextPage, false);
    assert.equal(secondPageResult.pageInfo.hasPreviousPage, true);

    assert.equal(
      secondPageResult.edges.map((edge) => edge.node.ifi.value).join(','),
      [
        getMboxFromPersona(secondPersona, 1),
      ].join(','),
    );
  });
});
