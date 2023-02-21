import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { MongoClient } from 'mongodb';
import config from '../../../config';
import Locked from '../../../errors/Locked';
import PersonaNotSetAndUnlocked from '../../../errors/PersonaNotSetAndUnlocked';
import repoFactory from '../../../repoFactory';
import type GetIdentifierOptions from '../../../repoFactory/options/GetIdentifierOptions';
import type GetIdentifierResult from '../../../repoFactory/results/GetIdentifierResult';
import type Lockable from '../../../repoFactory/utils/Lockable';
import service from '../../../service';
import type ServiceConfig from '../../../service/Config';
import type Service from '../../../serviceFactory/Service';
import {
  TEST_IFI,
  TEST_ORGANISATION,
} from '../../../tests/utils/values';
import createUpdateIdentifierPersona from '../../createUpdateIdentifierPersona';
import createIdentifier from '../../utils/createIdentifier';

describe('createUpdateIdentifierPersona mongo retry', () => {
  // Only test mongo repo
  /* istanbul ignore next */
  if (config.repoFactory.modelsRepoName !== 'mongo') {
    return;
  }

  let serviceConfig: ServiceConfig; let theService: Service;
  beforeEach(async () => {
    const repoFacade = repoFactory();
    serviceConfig = { repo: repoFacade };
    await serviceConfig.repo.clearRepo();
    theService = service(serviceConfig);
  });

  const getMongoDB = async () => {
    const client = await MongoClient.connect(
      config.mongoModelsRepo.url,
      config.mongoModelsRepo.options,
    );

    return client.db();
  };

  it('Should error after trying 3 times and the identifier is locked', async () => {
    const repoConfig = { db: getMongoDB() };

    // Create mock
    await createIdentifier(repoConfig)({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: undefined,
    });

    const resultPromise = theService.createUpdateIdentifierPersona({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave 6',
    });

    await assertError(Locked, resultPromise);
  });

  it(
    'should error if unlocked, but persona is not set, (should not be possible in rl)',
    async () => {
      const repoConfig = { db: getMongoDB() };
      const createIdentifierPromise = createIdentifier(repoConfig)({
        ifi: TEST_IFI,
        locked: false,
        organisation: TEST_ORGANISATION,
      });

      await assertError(PersonaNotSetAndUnlocked, createIdentifierPromise);
    });

  it('should retry twice and succeed on 3rd attempt', async () => {
    const repoFacade = repoFactory();

    // SETUP MOCK
    let getIdentifierCount = 0;
    const RETRY_SUCCESS = 2;

    const mockGetIdentifier = async (opts: GetIdentifierOptions): Promise<GetIdentifierResult & Lockable> => {
      getIdentifierCount = getIdentifierCount + 1;
      const realResult = await repoFacade.getIdentifier(opts);

      return {
        ...realResult,
        locked: getIdentifierCount <= RETRY_SUCCESS,
      };
    };

    serviceConfig = { repo: repoFacade };
    theService = service(serviceConfig);

    // SETUP IDENTIFIER

    const { persona } = await theService.createPersona({
      name: 'Dave',
      organisation: TEST_ORGANISATION,
    });

    await serviceConfig.repo.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    // RUN

    // const result = await theService.createUpdateIdentifierPersona({
    //   ifi: TEST_IFI,
    //   organisation: TEST_ORGANISATION,
    //   personaName: 'Dave 6',
    // });
    const repoConfig = { db: getMongoDB() };
    const result = await createUpdateIdentifierPersona(repoConfig)({
      getIdentifier: mockGetIdentifier,
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave 6',
    });

    // TEST

    const { persona: personaResult } = await theService.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: result.personaId,
    });

    assert.equal(personaResult.name, 'Dave');
    const THREE = 3;
    assert.equal(getIdentifierCount, THREE);
  });
});
