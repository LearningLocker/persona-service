import * as assert from 'assert';
import setup from './utils/setup';
import { TEST_CLIENT, TEST_MBOX_AGENT } from './utils/values';

describe('getProfiles', () => {
  const service = setup();

  it('should return no profile ids when getting a non-existing agent', async () => {
    await service.getProfiles({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
    });
    assert(true);
  });
});
