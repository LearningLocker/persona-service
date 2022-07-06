import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import {
  Db,
  FindAndModifyWriteOpResultObject,
  FindOneAndReplaceOption,
  MongoClient,
  ObjectID,
} from 'mongodb';

import config from '../../../config';
import Locked from '../../../errors/Locked';
import repoFactory from '../../../repoFactory';
import ServiceConfig from '../../../service/Config';
import { TEST_IFI, TEST_ORGANISATION } from '../../../tests/utils/values';
import createUpdateIdentifierPersona from '../../createUpdateIdentifierPersona';
import createOrUpdateIdentifier from '../../utils/createOrUpdateIdentifier';

describe('createUpdateIdentifierPersona mongo', async () => {

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

  const generateMockDb = async (forceLock: boolean) => {
    const db = (await MongoClient.connect(
      config.mongoModelsRepo.url,
      config.mongoModelsRepo.options,
    )).db();

    if (forceLock) {
      return {
        ...db,
        collection: (name: string) => {
          /* istanbul ignore next */
          if (name !== 'personaIdentifiers') {
            return db.collection(name);
          }
          const collection2 = db.collection(name);

          return Object.setPrototypeOf({
            ...collection2,
            findOneAndUpdate: async (
              filter: Object,
              update: Object,
              options: FindOneAndReplaceOption<any>,
            ): Promise<FindAndModifyWriteOpResultObject<any>> => {
              const result = await collection2.findOneAndUpdate(filter, update, options);
              return {
                ...result,
                lastErrorObject: {
                  upserted: undefined,
                },
              };
            },
          }, Object.getPrototypeOf(collection2));
        },
      } as Db;
    }

    return db;
  };

  it('Should throw locked if was not created', async () => {
    const resultPromise = createUpdateIdentifierPersona({ db: generateMockDb(true) })({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave 6',
    });

    await assertError(Locked, resultPromise);
  });

  it('Should handle a locked personaIdentifier without a lockedAt field', async () => {
    const config = { db: generateMockDb(false) };

    const actor = {
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Santan Dave',
    };
    // Make a new identifier and persona.
    const { identifier: testIdentifier } = await createUpdateIdentifierPersona(config)(actor);
    
    // Set locked: true and remove lockedAt.
    await createOrUpdateIdentifier(config)({
      filter: {
        _id: new ObjectID(testIdentifier.id),
        organisation: new ObjectID(testIdentifier.organisation),
      },
      update: {
        $set: { locked: true },
        $unset: { lockedAt: ''},
      },
      upsert: false,
    });

    // run createUpdateIdentifierPersona again with the same actor/ifi
    const { identifier: correctedIdentifier, wasCreated } = await createUpdateIdentifierPersona(config)(actor);
    
    // should replace persona field with new persona's _id, identifierId unchanged, wasCreated true.
    assert.equal(correctedIdentifier.id, testIdentifier.id, "Identifier's id should not change"); //double quoted.
    assert.deepEqual(correctedIdentifier.ifi, testIdentifier.ifi, 'Identifier\'s ifi should not change');
    assert.equal(correctedIdentifier.organisation, testIdentifier.organisation, 'Identifier\'s organisation should not change');

    assert.notEqual(correctedIdentifier.persona, testIdentifier.persona, 'Persona should have been replaced with a new one');

    assert.equal(wasCreated, true, 'New persona should have been created, so wasCreated should be true');

    // the document should have locked: false, and no lockedAt
    const identifierDocument = await (await config.db).collection('personaIdentifiers').findOne({ _id: new ObjectID(correctedIdentifier.id) });
    assert.equal(identifierDocument.locked, false, 'Identifier should now be unlocked');
    assert.equal(identifierDocument.lockedAt, undefined, 'Identifier document should not have lockedAt field');
  });
  
  it('Should throw a Locked Error for a locked personaIdentifier with a persona still attached and with a recent lockedAt field', async () => {
    const config = { db: generateMockDb(false) };

    const actor = {
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Davey Jones',
    };
    // Make a new identifier and persona.
    const { identifier: testIdentifier } = await createUpdateIdentifierPersona(config)(actor);
    
    // Set locked: true and remove lockedAt.
    await createOrUpdateIdentifier(config)({
      filter: {
        _id: new ObjectID(testIdentifier.id),
        organisation: new ObjectID(testIdentifier.organisation),
      },
      update: {
        $set: { locked: true, lockedAt: new Date() },
      },
      upsert: false,
    });

    const resultPromise = createUpdateIdentifierPersona(config)(actor);
    
    await assertError(Locked, resultPromise);

    // the document should still be locked and no lockedAt should be recent (< 30s)
    const identifierDocument = await (await config.db).collection('personaIdentifiers').findOne({ _id: new ObjectID(testIdentifier.id) });
    const lockAge = (new Date()).getTime() - identifierDocument.lockedAt.getTime();
    assert.equal(identifierDocument.locked, true, 'Identifier should still be locked');
    assert.equal(lockAge < 30000, true, 'Identifier document\'s locked at should be recent (< 30s)');
  });

  it('Should throw a Locked Error for a locked personaIdentifier without a persona and with a recent lockedAt field', async () => {
    const config = { db: generateMockDb(false) };

    const actor = {
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave Chappelle',
    };
    // Make a new identifier and persona.
    const { identifier: testIdentifier } = await createUpdateIdentifierPersona(config)(actor);
    
    // Set locked: true and remove lockedAt.
    await createOrUpdateIdentifier(config)({
      filter: {
        _id: new ObjectID(testIdentifier.id),
        organisation: new ObjectID(testIdentifier.organisation),
      },
      update: {
        $set: { locked: true, lockedAt: new Date() },
        $unset: { persona: '' },
      },
      upsert: false,
    });

    const resultPromise = createUpdateIdentifierPersona(config)(actor);
    
    await assertError(Locked, resultPromise);

    // the document should still be locked and no lockedAt should be recent (< 30s)
    const identifierDocument = await (await config.db).collection('personaIdentifiers').findOne({ _id: new ObjectID(testIdentifier.id) });
    const lockAge = (new Date()).getTime() - identifierDocument.lockedAt.getTime();
    assert.equal(identifierDocument.locked, true, 'Identifier should still be locked');
    assert.equal(lockAge < 30000, true, 'Identifier document\'s locked at should be recent (< 30s)');
  });

  it('Should fix a locked personaIdentifier with an expired lockedAt field (no persona attached)', async () => {
    const config = { db: generateMockDb(false) };

    const actor = {
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Davey Jones',
    };
    // Make a new identifier and persona.
    const { identifier: testIdentifier } = await createUpdateIdentifierPersona(config)(actor);
    // Set locked: true and remove lockedAt.
    const now = new Date().getTime();
    const oldDate = new Date(now - 35000);
    await createOrUpdateIdentifier(config)({
      filter: {
        _id: new ObjectID(testIdentifier.id),
        organisation: new ObjectID(testIdentifier.organisation),
      },
      update: {
        $set: { locked: true, lockedAt: oldDate },
        $unset: { persona: '' },
      },
      upsert: false,
    });

    const { identifier: correctedIdentifier, wasCreated } = await createUpdateIdentifierPersona(config)(actor);
    
    // should make new persona and put its _id in the identifier's persona field, identifierId unchanged, wasCreated true.
    assert.equal(correctedIdentifier.id, testIdentifier.id, 'Identifier\'s id should not change'); //double quoted.
    assert.deepEqual(correctedIdentifier.ifi, testIdentifier.ifi, 'Identifier\'s ifi should not change');
    assert.equal(correctedIdentifier.organisation, testIdentifier.organisation, 'Identifier\'s organisation should not change');

    assert.equal(correctedIdentifier.persona !== undefined, true, 'New persona should have made and added to the identifier');

    assert.equal(wasCreated, true, 'New persona should have been created, so wasCreated should be true');

    // the document should have locked: false, and no lockedAt
    const identifierDocument = await (await config.db).collection('personaIdentifiers').findOne({ _id: new ObjectID(correctedIdentifier.id) });
    assert.equal(identifierDocument.locked, false, 'Identifier should now be unlocked');
    assert.equal(identifierDocument.lockedAt, undefined, 'Identifier document should not have lockedAt field');
  });
});
