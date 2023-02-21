import * as assert from 'assert';
import config from '../../config';
import createIdentifier from '../../mongoModelsRepo/utils/createIdentifier';
import createMongoClient from '../../repoFactory/utils/createMongoClient';
import type CreateIdentifierOptions from '../../serviceFactory/options/CreateIdentifierOptions';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
  TEST_PERSONA_ID,
} from '../utils/values';

describe('getPersonaIdentifiers', () => {
  const persona = TEST_PERSONA_ID;
  const service = setup();
  const repoConfig = {
    db: createMongoClient({
      options: config.mongoModelsRepo.options,
      url: config.mongoModelsRepo.url,
    }),
  };

  const createIdentifierUtil = createIdentifier(repoConfig);

  const identifierData1: CreateIdentifierOptions = {
    ifi: {
      key: 'mbox',
      value: 'mbox:test1@mbox.com',
    },
    organisation: TEST_ORGANISATION,
    persona,
  };
  const identifierData2: CreateIdentifierOptions = {
    ifi: {
      key: 'mbox',
      value: 'mbox:test2@mbox.com',
    },
    organisation: TEST_ORGANISATION,
    persona,
  };
  const identifierData3: CreateIdentifierOptions = {
    ifi: {
      key: 'mbox',
      value: 'mbox:test3@mbox.com',
    },
    organisation: TEST_ORGANISATION,
    persona,
  };

  it('should get all persona identifiers with default options', async () => {
    const { identifier: identifier1 } = await createIdentifierUtil(identifierData1);
    const { identifier: identifier2 } = await createIdentifierUtil(identifierData2);
    const { identifier: identifier3 } = await createIdentifierUtil(identifierData3);

    const result = await service.getPersonaIdentifiers({
      organisation: TEST_ORGANISATION,
      persona,
    });

    assert.equal(result.identifiers.length, 3); // tslint:disable-line:no-magic-numbers
    assert.deepEqual(result.identifiers[0], identifier1);
    assert.deepEqual(result.identifiers[1], identifier2);
    assert.deepEqual(result.identifiers[2], identifier3);
  });

  it('should get all persona identifiers matching a filter', async () => {
    const { identifier: identifier1 } = await createIdentifierUtil(identifierData1);
    await createIdentifierUtil(identifierData2);
    await createIdentifierUtil(identifierData3);

    const result = await service.getPersonaIdentifiers({
      filter: {
        'ifi.key': 'mbox',
        'ifi.value': 'mbox:test1@mbox.com',
      },
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.identifiers.length, 1);

    assert.deepEqual(result.identifiers[0], identifier1);
  });

  it('should get all persona identifiers following the sort order', async () => {
    const { identifier: identifier1 } = await createIdentifierUtil(identifierData1);
    const { identifier: identifier2 } = await createIdentifierUtil(identifierData2);
    const { identifier: identifier3 } = await createIdentifierUtil(identifierData3);

    const result = await service.getPersonaIdentifiers({
      organisation: TEST_ORGANISATION,
      sort: { 'ifi.value': -1 },
    });

    assert.equal(result.identifiers.length, 3);
    assert.deepEqual(result.identifiers[0], identifier3);
    assert.deepEqual(result.identifiers[1], identifier2);
    assert.deepEqual(result.identifiers[2], identifier1);
  });

  it('should get all persona identifiers with a limit', async () => {
    await createIdentifierUtil(identifierData1);
    await createIdentifierUtil(identifierData2);
    await createIdentifierUtil(identifierData3);

    const result = await service.getPersonaIdentifiers({
      limit: 1,
      organisation: TEST_ORGANISATION,
    });

    assert.equal(result.identifiers.length, 1);
  });

  it('should get all persona identifiers with a skip', async () => {
    await createIdentifierUtil(identifierData1);
    const { identifier: identifier2 } = await createIdentifierUtil(identifierData2);
    const { identifier: identifier3 } = await createIdentifierUtil(identifierData3);

    const result = await service.getPersonaIdentifiers({
      organisation: TEST_ORGANISATION,
      skip: 1,
    });

    assert.equal(result.identifiers.length, 2);
    assert.deepEqual(result.identifiers[0], identifier2);
    assert.deepEqual(result.identifiers[1], identifier3);
  });
});
