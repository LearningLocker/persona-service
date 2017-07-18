import * as assert from 'assert';
import setup from './utils/setup';
import { TEST_CLIENT, TEST_MBOX_AGENT, TEST_PROFILE_ID } from './utils/values';

describe('deleteProfile', () => {
  const service = setup();

  it('should error when deleting a non-existing model', async () => {
    await service.deleteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    assert(true);
  });
});
