import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import setup from '../utils/setup';
import {
  JSON_CONTENT_TYPE,
  TEST_ACCOUNT_AGENT,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from '../utils/values';
import deleteProfile from './utils/deleteProfile';

describe('deleteProfile with existing profile', () => {
  const service = setup();

  const createProfile = async (agent: any) => {
    await service.overwriteProfile({
      agent,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
  };

  const assertDeleted = async (agent: any) => {
    // Asserts that the agent has no profiles.
    const getProfilesResult = await service.getProfiles({
      agent,
      client: TEST_CLIENT,
    });
    assert.deepEqual([], getProfilesResult.profileIds);

    // Asserts that the profile does not exist.
    const getProfilePromise = service.getProfile({
      agent,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    await assertError(NoModel, getProfilePromise);
  };

  it('should delete when deleting by mbox', async () => {
    await createProfile(TEST_MBOX_AGENT);
    await deleteProfile(TEST_MBOX_AGENT);
    await assertDeleted(TEST_MBOX_AGENT);
  });

  it('should delete when deleting by mbox_sha1sum', async () => {
    await createProfile(TEST_MBOXSHA1_AGENT);
    await deleteProfile(TEST_MBOXSHA1_AGENT);
    await assertDeleted(TEST_MBOXSHA1_AGENT);
  });

  it('should delete when deleting by openid', async () => {
    await createProfile(TEST_OPENID_AGENT);
    await deleteProfile(TEST_OPENID_AGENT);
    await assertDeleted(TEST_OPENID_AGENT);
  });

  it('should delete when deleting by account', async () => {
    await createProfile(TEST_ACCOUNT_AGENT);
    await deleteProfile(TEST_ACCOUNT_AGENT);
    await assertDeleted(TEST_ACCOUNT_AGENT);
  });

  it('should delete when deleting json', async () => {
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_JSON_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      profileId: TEST_PROFILE_ID,
    });
    await deleteProfile(TEST_MBOX_AGENT);
    await assertDeleted(TEST_MBOX_AGENT);
  });
});
