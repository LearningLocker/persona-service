import * as assert from 'assert';
import * as streamToString from 'stream-to-string';
import * as stringToStream from 'string-to-stream';
import setup from './utils/setup';
import { TEST_AGENT, TEST_CLIENT, TEST_PROFILE_ID } from './utils/values';

describe('overwriteProfile', () => {
  const service = setup();

  const assertOverwrite = async () => {
    const expectedContent = 'dummy_content';
    const expectedProfileIds = [TEST_PROFILE_ID];

    // Overwrites the profile.
    await service.overwriteProfile({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(expectedContent),
      profileId: TEST_PROFILE_ID,
    });

    // Checks the profileIds.
    const agentProfilesResult = await service.getProfiles({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
    });
    const actualProfileIds = agentProfilesResult.profileIds;
    assert.deepEqual(actualProfileIds, expectedProfileIds);

    // Checks the content.
    const agentProfileResult = await service.getProfile({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    const actualContent = await streamToString(agentProfileResult.content);
    assert.equal(actualContent, expectedContent);
  };

  it('should create model when overwriting a non-existing model', async () => {
    await assertOverwrite();
  });

  it('should overwrite model when overwriting an existing model', async () => {
    const initialContent = 'initial_dummy_content';

    // Creates model with initial content.
    await service.overwriteProfile({
      agent: TEST_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(initialContent),
      profileId: TEST_PROFILE_ID,
    });

    // Overwrites model with expected content.
    await assertOverwrite();
  });
});
