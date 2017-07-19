import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_INVALID_AGENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
} from '../utils/values';

describe('getProfile with non-existing model', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    await assertError(NoModel, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = service.getProfile({
      agent: TEST_INVALID_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    await assertError(Warnings, promise);
  });
});
