import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import setup from '../utils/setup';
import { TEST_CLIENT, TEST_INVALID_AGENT, TEST_MBOX_AGENT } from '../utils/values';

describe('getProfiles with non-existing agent', () => {
  const service = setup();

  it('should return no profile ids when getting a non-existing agent', async () => {
    const profilesResult = await service.getProfiles({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
    });
    assert.deepEqual([], profilesResult.profileIds);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = service.getProfiles({
      agent: TEST_INVALID_AGENT,
      client: TEST_CLIENT,
    });
    await assertError(Warnings, promise);
  });
});
