import * as assert from 'assert';
import {
  MongoClient,
} from 'mongodb';

import config from '../../config';
import repoFactory from '../../repoFactory';
import ServiceConfig from '../../service/Config';
import { TEST_IFI, TEST_ORGANISATION } from '../../tests/utils/values';
import createUpdateIdentifierPersona from '../createUpdateIdentifierPersona';
import creatIdentifier from '../utils/createIdentifier';
import { createPersonaAndAddToIdentifier } from '../utils/createPersonaAndAddToIdentifier';

describe('', async () => {

  let serviceConfig: ServiceConfig; // tslint:disable-line:no-let
  beforeEach(async () => {
    const repoFacade = repoFactory();
    serviceConfig = {repo: repoFacade};
    await serviceConfig.repo.clearRepo();
  });

  const generateMockDb = async () => {
    return (await MongoClient.connect(
      config.mongoModelsRepo.url,
      config.mongoModelsRepo.options,
    )).db();
  };

  it(
    'Should create a new persona and add toidentifier if identifier doens\'t have one',
    async () => {
      const dbConfig = { db: generateMockDb() };

      const { identifier: testNewIdentifier } = await creatIdentifier(dbConfig)({
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION,
      });

      const {
        identifier: identifierWithPersona,
        wasCreated,
      } = await createPersonaAndAddToIdentifier(dbConfig)({
        identifier: testNewIdentifier,
        personaName: 'David Tennant',
      });

      assert.equal(identifierWithPersona.persona !== undefined, true, 'Should create and add persona to identifier');
      assert.equal(wasCreated, true, 'Should create a new persona document');
    });

  it('Should just return identifier unchanged if it already has persona', async () => {
    const dbConfig = { db: generateMockDb() };

    const { identifier: identifierWithPersona } = await createUpdateIdentifierPersona(dbConfig)({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'David Tester',
    });

    const {
      identifier: unchangedIdentifier,
      wasCreated,
    } = await createPersonaAndAddToIdentifier(dbConfig)({
      identifier: identifierWithPersona,
      personaName: 'Dave Tester',
    });

    assert.deepEqual(unchangedIdentifier, identifierWithPersona, 'Identifier should be unchanged');
    assert.equal(wasCreated, false, 'We shouldn\'t have created anything, so should be false');
  });
});
