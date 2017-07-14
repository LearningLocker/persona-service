import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import setup from './utils/setup';
import { TEST_AGENT, TEST_CLIENT } from './utils/values';

describe('getProfile', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getProfile({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
      profileId: 'dummy_value',
    });
    await assertError(NoModel, promise);
  });
});
