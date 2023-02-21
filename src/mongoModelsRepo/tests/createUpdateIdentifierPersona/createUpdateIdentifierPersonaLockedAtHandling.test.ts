import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import {
  MongoClient,
  ObjectId,
} from 'mongodb';

import config from '../../../config';
import Locked from '../../../errors/Locked';
import repoFactory from '../../../repoFactory';
import ServiceConfig from '../../../service/Config';
import { TEST_IFI, TEST_ORGANISATION } from '../../../tests/utils/values';
import Config from '../../Config';
import createUpdateIdentifierPersona from '../../createUpdateIdentifierPersona';
import createOrUpdateIdentifier from '../../utils/createOrUpdateIdentifier';

describe('createUpdateIdentifierPersona identifier lockedAt handling mongo', () => {
  // Only test mongo repo
  /* istanbul ignore next */
  if (config.repoFactory.modelsRepoName !== 'mongo') {
    return;
  }

  let serviceConfig: ServiceConfig;
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

  it('Should throw a Locked Error for a locked personaIdentifier, with a persona still attached and with a recent lockedAt field',
    async () => {
      const dbConfig = { db: generateMockDb() };

      const actor = {
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION,
        personaName: 'Davey Jones',
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
          $set: { locked: true, lockedAt: new Date() },
        },
        upsert: false,
      });

      const resultPromise = createUpdateIdentifierPersona(dbConfig)(actor);

      await assertError(Locked, resultPromise);

      // the document should still be locked and no lockedAt should be recent (< 30s)
      const identifierDocument = await (await getPersonaIdentifiersCollection(dbConfig))
        .findOne({ _id: new ObjectId(testIdentifier.id) });

      const lockAge = (new Date()).getTime() - identifierDocument?.lockedAt.getTime();
      assert.equal(identifierDocument?.locked, true, 'Identifier should still be locked');
      assert.equal(lockAge < 30000,
        true,
        'Identifier document\'s locked at should be recent (< 30s)',
      );
    });

  it('Should throw a Locked Error for a locked personaIdentifier without a persona and with a recent lockedAt field',
    async () => {
      const dbConfig = { db: generateMockDb() };

      const actor = {
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION,
        personaName: 'Dave Chappelle',
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
          $set: { locked: true, lockedAt: new Date() },
          $unset: { persona: '' },
        },
        upsert: false,
      });

      const resultPromise = createUpdateIdentifierPersona(dbConfig)(actor);

      await assertError(Locked, resultPromise);

      // the document should still be locked and no lockedAt should be recent (< 30s)
      const identifierDocument = await (await getPersonaIdentifiersCollection(dbConfig))
        .findOne({ _id: new ObjectId(testIdentifier.id) });

      const lockAge = (new Date()).getTime() - identifierDocument?.lockedAt.getTime();
      assert.equal(identifierDocument?.locked, true, 'Identifier should still be locked');
      assert.equal(
        lockAge < 30000,
        true,
        'Identifier document\'s locked at should be recent (< 30s)',
      );
    });

  it('Should fix a locked personaIdentifier with an expired lockedAt field (no persona attached)',
    async () => {
      const dbConfig = { db: generateMockDb() };

      const actor = {
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION,
        personaName: 'Davey Jones',
      };
      // Make a new identifier and persona.
      const { identifier: testIdentifier } = await createUpdateIdentifierPersona(dbConfig)(actor);
      // Set locked: true and remove lockedAt.
      const now = new Date().getTime();
      const oldDate = new Date(now - 35000);
      await createOrUpdateIdentifier(dbConfig)({
        filter: {
          _id: new ObjectId(testIdentifier.id),
          organisation: new ObjectId(testIdentifier.organisation),
        },
        update: {
          $set: { locked: true, lockedAt: oldDate },
          $unset: { persona: '' },
        },
        upsert: false,
      });

      const {
        identifier: correctedIdentifier,
        wasCreated,
      } = await createUpdateIdentifierPersona(dbConfig)(actor);

      // should make new persona and put its _id in the identifier's persona field,
      // identifierId unchanged, wasCreated true.
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

      assert.equal(
        correctedIdentifier.persona !== undefined,
        true,
        'New persona should have made and added to the identifier',
      );

      assert.equal(
        wasCreated,
        true,
        'New persona should have been created, so wasCreated should be true',
      );

      // the document should have locked: false, and no lockedAt
      const identifierDocument = await (await getPersonaIdentifiersCollection(dbConfig))
        .findOne({ _id: new ObjectId(correctedIdentifier.id) });

      assert.equal(identifierDocument?.locked, false, 'Identifier should now be unlocked');
      assert.equal(
        identifierDocument?.lockedAt,
        undefined,
        'Identifier document should not have lockedAt field',
      );
    });
});
