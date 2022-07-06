import * as assert from 'assert';
import {
  Db,
  MongoClient,
  ObjectID,
} from 'mongodb';

import config from '../../config';
import repoFactory from '../../repoFactory';
import ServiceConfig from '../../service/Config';
import createUpdateIdentifierPersona from '../createUpdateIdentifierPersona';
import { TEST_IFI, TEST_ORGANISATION } from '../../tests/utils/values';
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

  it('Should create a new persona and add to identifier if identifier doens\'t have one', async ()=> {
    const config = { db: generateMockDb() };

    const { identifier: testNewIdentifier } = await creatIdentifier(config)({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
    });

    const { identifier: identifierWithPersona, wasCreated } = await createPersonaAndAddToIdentifier(config)({
      identifier: testNewIdentifier,
      personaName: 'David Tennant',
    });

    // identifier: updatedIdentifier,
    // identifierId: updatedIdentifier.id,
    // personaId: updatedIdentifier.persona,
    // wasCreated: true,

    assert.equal(identifierWithPersona.persona !== undefined, true, 'Should create and add persona to identifier');
    assert.equal(wasCreated, true, 'Should create a new persona document');
  });

  it('Should just return identifier unchanged if it already has persona', async ()=> {
    // identifier,
    // identifierId: identifier.id,
    // personaId: identifier.persona,
    // wasCreated: false,
    const config = { db: generateMockDb() };

    const { identifier: identifierWithPersona } = await createUpdateIdentifierPersona(config)({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'David Tester',
    });

    const { identifier: unchangedIdentifier, wasCreated } = await createPersonaAndAddToIdentifier(config)({
      identifier: identifierWithPersona,
      personaName: 'Dave Tester',
    });

    assert.deepEqual(unchangedIdentifier, identifierWithPersona, 'Identifier should be unchanged');
    assert.equal(wasCreated, false, 'We shouldn\'t have created anything, so should be false');
  });
});
