import assertError from 'jscommons/dist/tests/utils/assertError';
import NoModelWithId from '../../errors/NoModelWithId';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
  TEST_ORGANISATION_OUTSIDE_STORE,
} from '../utils/values';

const TEST_PERSONA_ID = '58fe13e34effd3c26a9fc4b8';

describe('getPersona with non-existing model', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getPersona({
      organisation: TEST_ORGANISATION,
      personaId: TEST_PERSONA_ID,
    });
    await assertError(NoModelWithId, promise);
  });

  it('should error getting model outside the org', async () => {
    const {persona} = await service.createPersona({
      name: 'Dave',
      organisation: TEST_ORGANISATION,
    });

    const promise = service.getPersona({
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
      personaId: persona.id,
    });
    await assertError(NoModelWithId, promise);

  });
});
