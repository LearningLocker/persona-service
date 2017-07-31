import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_CLIENT, TEST_CLIENT_OUTSIDE_ORG } from '../utils/values';

const TEST_PERSONA_ID = '58fe13e34effd3c26a9fc4b8';

describe('deletePersona', () => {
  const service = setup();

  it('Should throw an error when deleting a non-existing persona', async () => {
    const promise = service.deletePersona({
      client: TEST_CLIENT,
      personaId: TEST_PERSONA_ID,
    });
    await assertError(NoModel, promise);
  });

  it('Should throw an error when deleting a persona outside the org', async () => {
    const persona = await createTestPersona();
    const promise = service.deletePersona({
      client: TEST_CLIENT_OUTSIDE_ORG,
      personaId: persona.id,
    });
    await assertError(NoModel, promise);
  });

  it('Should delete a persona when using valid options', async () => {
    const persona = await createTestPersona();
    await service.deletePersona({
      client: TEST_CLIENT,
      personaId: persona.id,
    });
    const promise = service.getPersona({
      client: TEST_CLIENT,
      personaId: persona.id,
    });
    await assertError(NoModelWithId, promise);
  });
});