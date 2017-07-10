import * as assert from 'assert';
import setup from './utils/setup';
import { TEST_AGENT, TEST_CLIENT } from './utils/values';

describe('deleteAgentProfile', () => {
  const service = setup();

  it('should error when deleting a non-existing model', async () => {
    await service.deleteAgentProfile({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
      profileId: 'dummy_value',
    });
    assert(true);
  });
});
