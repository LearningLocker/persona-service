import * as assert from 'assert';
import {
  MongoClient,
  ObjectId,
} from 'mongodb';

import config from '../../../config';
import repoFactory from '../../../repoFactory';
import ServiceConfig from '../../../service/Config';
import { TEST_IFI, TEST_ORGANISATION } from '../../../tests/utils/values';
import Config from '../../Config';
import createUpdateIdentifierPersona from '../../createUpdateIdentifierPersona';
import createOrUpdateIdentifier from '../../utils/createOrUpdateIdentifier';

describe('createUpdateIdentifierPersona identifier old lock handling mongo', async () => {
  // Only test mongo repo
  /* istanbul ignore next */
  if (config.repoFactory.modelsRepoName !== 'mongo') {
    return;
  }

  let serviceConfig: ServiceConfig; // tslint:disable-line:no-let
  beforeEach(async () => {
    const repoFacade = repoFactory();
    serviceConfig = {repo: repoFacade};
    await serviceConfig.repo.clearRepo();
  });

  const generateMockDb = async () => (
    await MongoClient.connect(
      config.mongoModelsRepo.url,
      config.mongoModelsRepo.options,
    )).db();

  const getPersonaIdentifiersCollection = async (dbConfig: Config) => (
    (await dbConfig.db).collection('personaIdentifiers')
  );

  it('Should handle a locked personaIdentifier without a lockedAt field', async () => {
    const dbConfig = { db: generateMockDb() };

    const actor = {
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Santan Dave',
    };
    // Make a new identifier and persona.
    const { identifier: testIdentifier } = await createUpdateIdentifierPersona(dbConfig)(actor);

    // Set locked: true and remove lockedAt.
    await createOrUpdateIdentifier(dbConfig)({
      filter: {
        _id: new ObjectId(testIdentifier.id),
        organisation: new ObjectId(testIdentifier.organisation),
      },
      update: {
        $set: { locked: true },
        $unset: { lockedAt: ''},
      },
      upsert: false,
    });

    // run createUpdateIdentifierPersona again with the same actor/ifi
    const {
      identifier: correctedIdentifier,
      wasCreated,
    } = await createUpdateIdentifierPersona(dbConfig)(actor);

    // should replace persona field with new persona's _id, identifierId unchanged, wasCreated true.
    assert.equal(correctedIdentifier.id, testIdentifier.id, 'Identifier\'s id should not change');
    assert.deepEqual(
      correctedIdentifier.ifi,
      testIdentifier.ifi,
      'Identifier\'s ifi should not change',
    );
    assert.equal(
      correctedIdentifier.organisation,
      testIdentifier.organisation,
      'Identifier\'s organisation should not change',
    );

    assert.notEqual(correctedIdentifier.persona, testIdentifier.persona, 'Persona should have been replaced with a new one');

    assert.equal(wasCreated, true, 'New persona should have been created, so wasCreated should be true');

    // the document should have locked: false, and no lockedAt
    const identifierDocument = await (await getPersonaIdentifiersCollection(dbConfig))
      .findOne({ _id: new ObjectId(correctedIdentifier.id) });

    assert.equal(identifierDocument?.locked, false, 'Identifier should now be unlocked');
    assert.equal(identifierDocument?.lockedAt, undefined, 'Identifier document should not have lockedAt field');
  });
});
