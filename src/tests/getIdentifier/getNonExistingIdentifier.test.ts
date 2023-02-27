import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_IFI,
  TEST_ORGANISATION,
  TEST_ORGANISATION_OUTSIDE_STORE,
} from '../utils/values';

const TEST_IDENTIFIER_ID = '58fe13e34effd3c26a9fc4b8';

describe('getIdentifier with non-existing model', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getIdentifier({
      id: TEST_IDENTIFIER_ID,
      organisation: TEST_ORGANISATION,
    });
    await assertError(NoModel, promise);
  });

  it('should error getting model outside the org', async () => {
    const persona = await createTestPersona();
    const { identifier } = await service.createIdentifier({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      persona: persona.id,
    });
    const promise = service.getIdentifier({
      id: identifier.id,
      organisation: TEST_ORGANISATION_OUTSIDE_STORE,
    });
    await assertError(NoModel, promise);
  });
});
