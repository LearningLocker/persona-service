import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import createTestPersona from '../utils/createTestPersona';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_IFI,
} from '../utils/values';

const TEST_IDENTIFIER_ID = '58fe13e34effd3c26a9fc4b8';

describe('getIdentifier with non-existing model', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getIdentifier({
      client: TEST_CLIENT,
      id: TEST_IDENTIFIER_ID,
    });
    await assertError(NoModel, promise);
  });

  it('should error getting model outside the org', async () => {
    const persona = await createTestPersona();
    const {identifier} = await service.createIdentifier({
      client: TEST_CLIENT,
      ifi: TEST_IFI,
      persona: persona.id,
    });
    const promise = service.getIdentifier({
      client: TEST_CLIENT_OUTSIDE_ORG,
      id: identifier.id,
    });
    await assertError(NoModel, promise);
  });
});
