import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import InvalidGetPersonaFromIdentifierOptions from // tslint:disable:import-spacing
  '../../errors/InvalidGetPersonaFromIdentifierOptions';
import repoFactory from '../../repoFactory';
import Config from '../../service/Config';
import getPersonaIdFromIdentifier from '../../service/utils/getPersonaIdFromIdentifier';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_OPENID_AGENT,
} from '../utils/values';

describe('getPersonaIdFromIdentifier', () => {
  const service = setup();

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

    const {persona} = await service.getPersona({
      client: TEST_CLIENT,
      personaId: result,
    });

    assert.equal(persona.id, result);
  });

  it('Should use an existing persona', async () => {
    const repoFacade = repoFactory();
    const config: Config = {repo: repoFacade};

    const { persona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave 2',
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
    const repoFacade = repoFactory();
    const config: Config = {repo: repoFacade};

    const { persona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave 3',
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

    assertError(InvalidGetPersonaFromIdentifierOptions, resultPromise);
  });

  it('should retry if persona is not on the identifier', async () => {
    const repoFacade = repoFactory();
    const config: Config = {repo: repoFacade};

    const { persona } = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave 2',
    });
    const {identifier} = await config.repo.createIdentifier({
      client: TEST_CLIENT,
      ifi: {
        key: 'openid',
        value: TEST_OPENID_AGENT.openid as string,
      },
      persona: undefined,
    });

    const result = await getPersonaIdFromIdentifier({
      client: TEST_CLIENT,
      config,
      identifier,
      wasCreated: false,
    });

    assert.equal(result, persona.id);
  });
});
