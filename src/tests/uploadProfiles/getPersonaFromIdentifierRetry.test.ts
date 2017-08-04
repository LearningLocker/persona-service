import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
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

const createIdentifier = (config: Config) => (config.repo.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: undefined,
    }));

describe('getPersonaIdFromIdentifier getPersonaIdWithRetry', () => {
  it('should retry if persona is not on the identifier', async () => {
    const repoFacade = repoFactory();

    let getIdentifierCount = 0; // tslint:disable-line prefer-const
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

    const {identifier} = await createIdentifier(config);

    const resultPromise = getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier,
      wasCreated: false,
    });

    await assertError(UnassignedPersonaOnIdentifier, resultPromise);

    await config.repo.clearRepo();
  });

  it('should retry if persona is not on the identifier 3nd attemp succesfull', async () => {
    const repoFacade = repoFactory();

    const {persona} = await repoFacade.createPersona({
      client: TEST_CLIENT,
      name: 'Dave 6',
    });

    let getIdentifierCount = 0; // tslint:disable-line prefer-const
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

    const {identifier: identifier3} = await createIdentifier(config);

    const resultPromise = getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier: identifier3,
      wasCreated: false,
    });

    const result = await resultPromise;

    assert.equal(result, persona.id);

    await config.repo.clearRepo();
  });
}); // tslint:disable-line max-file-line-count
