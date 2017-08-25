import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import Locked from '../../errors/Locked';
import repoFactory from '../../repoFactory';
import GetIdentifierOptions from '../../repoFactory/options/GetIdentifierOptions';
import GetIdentifierResult from '../../repoFactory/results/GetIdentifierResult';
// import setup from '../utils/setup';
import service from '../../service';
import Config from '../../service/Config';
import Service from '../../serviceFactory/Service';
import createTestPersona from '../utils/createTestPersona';
import {
  TEST_IFI,
  TEST_ORGANISATION,
} from '../utils/values';

describe('createUpdateIdentifierPersona retry', () => {

  let config: Config; // tslint:disable-line:no-let
  let theService: Service; // tslint:disable-line:no-let
  beforeEach(async () => {
    const repoFacade = repoFactory();
    config = {repo: repoFacade};
    await config.repo.clearRepo();
    theService = service(config);
  });

  it('Should error aftery trying 3 times and the identifier is locked', async () => {

    const persona = await createTestPersona();

    // Create mock
    await config.repo.createIdentifier({
      ifi: TEST_IFI,
      locked: true,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
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
    await config.repo.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
    });

    try {
      await theService.createUpdateIdentifierPersona({
        ifi: TEST_IFI,
        organisation: TEST_ORGANISATION,
        personaName: 'Dave 6',
      });
    } catch (err) {
      assert.equal(err.message, 'Identifier should have a persona');
    }
  });

  it('should retry twice and succed on 3rd attempt', async () => {
    const repoFacade = repoFactory();

    // SETUP MOCK
    let getIdentifierCount = 0; // tslint:disable-line:no-let
    const RETRY_SUCCESS = 2;
    const repoFacadeWithMock = {
      ...repoFacade,
      getIdentifier: async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
        getIdentifierCount = getIdentifierCount + 1;
        const realResult = await repoFacade.getIdentifier(opts);

        return {
          ...realResult,
          locked: getIdentifierCount > RETRY_SUCCESS ? false : true,
        };
      },
    };
    config = {repo: repoFacadeWithMock};
    theService = service(config);

    // SETUP IDENTIFIER

    const {persona} = await theService.createPersona({
      name: 'Dave',
      organisation: TEST_ORGANISATION,
    });

    await config.repo.createIdentifier({
      ifi: TEST_IFI,
      locked: true,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    // RUN

    const result = await theService.createUpdateIdentifierPersona({
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
