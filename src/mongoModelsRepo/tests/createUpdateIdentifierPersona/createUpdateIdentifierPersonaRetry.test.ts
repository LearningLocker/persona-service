import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { MongoClient } from 'mongodb';
import config from '../../../config';
import Locked from '../../../errors/Locked';
import PersonaNotSetAndUnlocked from '../../../errors/PersonaNotSetAndUnlocked';
import repoFactory from '../../../repoFactory';
import GetIdentifierOptions from '../../../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../../../repoFactory/results/GetIdentifierResult';
import Lockable from '../../../repoFactory/utils/Lockable';
import service from '../../../service';
import ServiceConfig from '../../../service/Config';
import Service from '../../../serviceFactory/Service';
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

  let serviceConfig: ServiceConfig; // tslint:disable-line:no-let
  let theService: Service; // tslint:disable-line:no-let
  beforeEach(async () => {
    const repoFacade = repoFactory();
    serviceConfig = {repo: repoFacade};
    await serviceConfig.repo.clearRepo();
    theService = service(serviceConfig);
  });

  it('Should error aftery trying 3 times and the identifier is locked', async () => {
    const repoConfig = {
      db: MongoClient.connect(
        config.mongoModelsRepo.url,
        config.mongoModelsRepo.options,
      ),
    };

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
    async () =>
  { // tslint:disable-line:one-line
    const repoConfig = {
      db: MongoClient.connect(
        config.mongoModelsRepo.url,
        config.mongoModelsRepo.options,
      ),
    };

    const createIdentifierPromise = createIdentifier(repoConfig)({
      ifi: TEST_IFI,
      locked: false,
      organisation: TEST_ORGANISATION,
    });

    await assertError(PersonaNotSetAndUnlocked, createIdentifierPromise);
  });

  it('should retry twice and succed on 3rd attempt', async () => {
    const repoFacade = repoFactory();

    // SETUP MOCK
    let getIdentifierCount = 0; // tslint:disable-line:no-let
    const RETRY_SUCCESS = 2;

    const mockGetIdentifier = async (opts: GetIdentifierOptions):
    Promise<GetIdentifierResult & Lockable> => {

      getIdentifierCount = getIdentifierCount + 1;
      const realResult = await repoFacade.getIdentifier(opts);

      return {
        ...realResult,
        locked: getIdentifierCount > RETRY_SUCCESS ? false : true,
      };
    };

    serviceConfig = {repo: repoFacade};
    theService = service(serviceConfig);

    // SETUP IDENTIFIER

    const {persona} = await theService.createPersona({
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
    const repoConfig = {
      db: MongoClient.connect(
        config.mongoModelsRepo.url,
        config.mongoModelsRepo.options,
      ),
    };

    const result = await createUpdateIdentifierPersona(repoConfig)({
      getIdentifier: mockGetIdentifier,
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave 6',
    });

    // TEST

    const {persona: personaResult} = await theService.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: result.personaId,
    });

    assert.equal(personaResult.name, 'Dave');
    const THREE = 3;
    assert.equal(getIdentifierCount, THREE);
  });
}); // tslint:disable-line:max-file-line-count
