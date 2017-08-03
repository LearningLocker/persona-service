import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import InvalidGetPersonaFromIdentifierOptions from // tslint:disable:import-spacing
  '../../errors/InvalidGetPersonaFromIdentifierOptions';
import UnassignedPersonaOnIdentifier from '../../errors/UnassignedPersonaOnIdentifier';
import Identifier from '../../models/Identifier';
import repoFactory from '../../repoFactory';
import GetIdentifierOptions from '../../repoFactory/options/GetIdentifierOptions';
import Repo from '../../repoFactory/Repo';
import GetIdentifierResult from '../../repoFactory/results/GetIdentifierResult';
import Config from '../../service/Config';
import getPersonaIdFromIdentifier from '../../service/utils/getPersonaIdFromIdentifier';
import {
  TEST_CLIENT,
  TEST_OPENID_AGENT,
} from '../utils/values';

describe('getPersonaIdFromIdentifier', () => {
  it('Should create a new persona if the identifier was created', async () => {

    const repoFacade = repoFactory();
    const config: Config = {repo: repoFacade};

    // Create in the repo, as in the service, persona is required
    const {identifier, wasCreated} = await config.repo.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: undefined,
    });
    assert.equal(wasCreated, true);

    const result = await getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier,
      wasCreated: true,
    });

    assert.equal(typeof result, 'string');
  });

  it('Should use an existing persona', async () => {
    const repoFacade = repoFactory ();
    const config: Config = {repo: repoFacade};

    const persona = {
      id: 'persona_id',
    };
    const {identifier} = await config.repo.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: persona.id,
    });

    const result = await getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier,
      wasCreated: false,
    });

    assert.equal(result, persona.id);
  });

  it('should error on invalid arguments', async () => {
    const repoFacade = repoFactory();
    const config: Config = {repo: repoFacade};

    const persona = {
      id: 'persona_id',
    };
    const {identifier} = await config.repo.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: persona.id,
    });
    const resultPromise = getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier,
      wasCreated: true,
    });

    await assertError(InvalidGetPersonaFromIdentifierOptions, resultPromise);
  });

  it('should retry if persona is not on the identifier', async () => {
    const repoFacade = repoFactory();

    let getIdentifierCount = 0;
    const repoFacadeWithMock: Repo = {
      ...repoFacade,
      getIdentifier: async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
        ++getIdentifierCount;
        const DEFAULT_RETRIES = 3;
        /* istanbul ignore if  */
        if (getIdentifierCount > (DEFAULT_RETRIES + 1)) { // 4 = 1 + 3 retries
          throw new Error('Retried more than 3 times');
        }
        return {
          identifier: {
            id: opts.id,
            ifi: {
              key: 'openid',
              value: TEST_OPENID_AGENT.openid as string,
            },
            organisation: TEST_CLIENT.organisation,
            persona: undefined,
          },
        };
      },
    };

    const config: Config = {repo: repoFacadeWithMock};

    const {identifier} = await config.repo.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: undefined,
    });

    const resultPromise = getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier,
      wasCreated: false,
    });

    await assertError(UnassignedPersonaOnIdentifier, resultPromise);
  });

  it('should retry if persona is not on the identifier 2nd attemp succesfull', async () => {
    const repoFacade = repoFactory();

    const persona = {
      id: 'persona_id',
    };

    let getIdentifierCount = 0;
    const repoFacadeWithMock: Repo = {
      ...repoFacade,
      getIdentifier: async (opts: GetIdentifierOptions): Promise<GetIdentifierResult> => {
        ++getIdentifierCount;
        const RETRIES = 2;
        const identifierWithoutPersona: Identifier = {
          id: opts.id,
          ifi: {
            key: 'openid',
            value: TEST_OPENID_AGENT.openid as string,
          },
          organisation: TEST_CLIENT.organisation,
          persona: undefined,
        };
        if (getIdentifierCount === (RETRIES + 1)) { // 4 = 1 + 2 retries
          // On second retry, return the persona.
          const identifierWithPersona: Identifier = {
            ...identifierWithoutPersona,
            persona: persona.id,
          };
          return {
            identifier: identifierWithPersona,
          };
        }
        return {
          identifier: identifierWithoutPersona,
        };
      },
    };

    const config: Config = {repo: repoFacadeWithMock};

    const {identifier} = await config.repo.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: undefined,
    });

    const resultPromise = getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier,
      wasCreated: false,
    });

    const result = await resultPromise;

    assert.equal(result, persona.id);
  });
}); // tslint:disable-line max-file-line-count
