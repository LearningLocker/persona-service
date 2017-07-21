import * as stringToStream from 'string-to-stream';
import assertProfile from '../utils/assertProfile';
import createImmutableProfile from '../utils/createImmutableProfile';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile replacing profiles', () => {
  const service = setup();

  it('should overwrite model when overwriting an existing model', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteProfile(TEST_MBOX_AGENT, initialContent);

    // Overwrites model with expected content.
    const getProfileResult = await service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      ifMatch: getProfileResult.etag,
      profileId: TEST_PROFILE_ID,
    });
    await assertProfile(TEST_MBOX_AGENT, TEST_CONTENT);
  });

  it('should not overwrite existing models when using a non-existing model', async () => {
    await createImmutableProfile();
    await overwriteProfile(TEST_MBOX_AGENT, TEST_CONTENT);
    await assertProfile(TEST_MBOX_AGENT, TEST_CONTENT);
  });
});
