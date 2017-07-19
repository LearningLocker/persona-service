import * as assert from 'assert';
import { delay } from 'bluebird';
import * as stringToStream from 'string-to-stream';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';

describe('getProfiles with since', () => {
  const service = setup();

  const createProfile = async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  };

  const getProfiles = async (timestamp: Date) => {
    return service.getProfiles({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      since: timestamp,
    });
  };

  it('should return no profile ids when updated before since', async () => {
    await createProfile();
    await Promise.resolve(delay(1));
    const timestamp = new Date();
    const getProfilesResult = await getProfiles(timestamp);
    assert.deepEqual(getProfilesResult.profileIds, []);
  });

  it('should return the profile id when updated after since', async () => {
    const timestamp = new Date();
    await Promise.resolve(delay(1));
    await createProfile();
    const getProfilesResult = await getProfiles(timestamp);
    assert.deepEqual(getProfilesResult.profileIds, [TEST_PROFILE_ID]);
  });
});
