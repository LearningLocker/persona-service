import * as assert from 'assert';
import setup from './utils/setup';
import { TEST_AGENT, TEST_CLIENT } from './utils/values';

describe('getProfiles', () => {
  const service = setup();

  it('should return no profile ids when getting a non-existing agent', async () => {
    await service.getProfiles({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
    });
    assert(true);
  });
});
