import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import PersonaHasIdentsError from '../../errors/PersonaHasIdentsError';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import { TEST_ORGANISATION, TEST_ORGANISATION_OUTSIDE_STORE } from '../utils/values';

const TEST_PERSONA_ID = '58fe13e34effd3c26a9fc4b8';

describe('deletePersona', () => {
  const service = setup();

  it('Should throw an error when deleting a non-existing persona', async () => {
    const promise = service.deletePersona({
      organisation: TEST_ORGANISATION,
      personaId: TEST_PERSONA_ID,
    });
    await assertError(NoModel, promise);
  });

  it('Should throw an error when deleting a persona outside the org', async () => {
    const persona = await createTestPersona();
    const promise = service.deletePersona({
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
      personaId: persona.id,
    });
    await assertError(NoModel, promise);
  });

  it('Should delete a persona when using valid options', async () => {
    const persona = await createTestPersona();
    await service.deletePersona({
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
    });
    const promise = service.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
    });
    await assertError(NoModelWithId, promise);
  });

  it('should throw an error when deleting a persona with identifiers', async () => {
    const persona = await createTestPersona();
    await service.createIdentifier({
      ifi: {
        key: 'mbox',
        value: 'test@test.com',
      },
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });

    const deletePromise = service.deletePersona({
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
    });

    await assertError(PersonaHasIdentsError, deletePromise);
  });
});
