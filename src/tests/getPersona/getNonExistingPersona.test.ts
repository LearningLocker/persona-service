import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_CLIENT_OUTSIDE_ORG,
} from '../utils/values';

const TEST_PERSONA_ID = '58fe13e34effd3c26a9fc4b8';

describe('getPersona with non-existing model', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getPersona({
      client: TEST_CLIENT,
      personaId: TEST_PERSONA_ID,
    });
    await assertError(NoModelWithId, promise);
  });

  it('should error getting model outside the org', async () => {
    const {persona} = await service.createPersona({
      client: TEST_CLIENT,
      name: 'Dave',
    });

    const promise = service.getPersona({
      client: TEST_CLIENT_OUTSIDE_ORG,
      personaId: persona.id,
    });
    await assertError(NoModelWithId, promise);

  });
});
