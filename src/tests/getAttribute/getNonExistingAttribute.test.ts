import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_ORGANISATION,
  TEST_ORGANISATION_OUTSIDE_STORE,
} from '../utils/values';

const TEST_ATTRIBUTE_ID = '58fe13e34effd3c26a9fc4b8';

describe('getAttribute with non-existing model', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getAttribute({
      id: TEST_ATTRIBUTE_ID,
      organisation: TEST_ORGANISATION,
    });
    await assertError(NoModel, promise);
  });

  it('should error getting model outside the org', async () => {
    const persona = await createTestPersona();
    const { attribute } = await service.overwritePersonaAttribute({
      key: 'hair',
      organisation: TEST_ORGANISATION,
      personaId: persona.id,
      value: 'brown',
    });
    const promise = service.getAttribute({
      id: attribute.id,
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
    });
    await assertError(NoModel, promise);
  });
});
