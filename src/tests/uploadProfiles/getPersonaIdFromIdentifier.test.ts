import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import setupService from 'jscommons/dist/tests/utils/setupService';
import InvalidGetPersonaFromIdentifierOptions from // tslint:disable:import-spacing
  '../../errors/InvalidGetPersonaFromIdentifierOptions';
import UnassignedPersonaOnIdentifier from '../../errors/UnassignedPersonaOnIdentifier';
import Identifier from '../../models/Identifier';
import repoFactory from '../../repoFactory';
import GetIdentifierOptions from '../../repoFactory/options/GetIdentifierOptions';
import Repo from '../../repoFactory/Repo';
import GetIdentifierResult from '../../repoFactory/results/GetIdentifierResult';
import service from '../../service';
import Config from '../../service/Config';
import getPersonaIdFromIdentifier from '../../service/utils/getPersonaIdFromIdentifier';
import {
  TEST_CLIENT,
  TEST_OPENID_AGENT,
} from '../utils/values';

describe('getPersonaIdFromIdentifier', () => {
  const repoFacade = repoFactory();
  const config: Config = {repo: repoFacade};

  const serviceFacade = service(config);
  setupService(serviceFacade)();

  it('Should create a new persona if the identifier was created', async () => {
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
    const { persona } = await repoFacade.createPersona({
      client: TEST_CLIENT,
      name: 'Dave 7',
    });

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
    const { persona } = await repoFacade.createPersona({
      client: TEST_CLIENT,
      name: 'Dave 8',
    });

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
}); // tslint:disable-line max-file-line-count
