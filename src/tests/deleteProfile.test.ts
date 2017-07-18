import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import * as stringToStream from 'string-to-stream';
import setup from './utils/setup';
import {
  TEST_ACCOUNT_AGENT,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
  TEXT_CONTENT_TYPE,
} from './utils/values';

describe('deleteProfile', () => {
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

  const deleteProfile = async (agent: any) => {
    await service.deleteProfile({
      agent,
      client: TEST_CLIENT,
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

  it('should error when deleting a non-existing model', async () => {
    const promise = deleteProfile(TEST_MBOX_AGENT);
    await assertError(NoModel, promise);
  });

  it('should delete when deleting an existing model by mbox', async () => {
    await createProfile(TEST_MBOX_AGENT);
    await deleteProfile(TEST_MBOX_AGENT);
    await assertDeleted(TEST_MBOX_AGENT);
  });

  it('should delete when deleting an existing model by mbox_sha1sum', async () => {
    await createProfile(TEST_MBOXSHA1_AGENT);
    await deleteProfile(TEST_MBOXSHA1_AGENT);
    await assertDeleted(TEST_MBOXSHA1_AGENT);
  });

  it('should delete when deleting an existing model by openid', async () => {
    await createProfile(TEST_OPENID_AGENT);
    await deleteProfile(TEST_OPENID_AGENT);
    await assertDeleted(TEST_OPENID_AGENT);
  });

  it('should delete when deleting an existing model by account', async () => {
    await createProfile(TEST_ACCOUNT_AGENT);
    await deleteProfile(TEST_ACCOUNT_AGENT);
    await assertDeleted(TEST_ACCOUNT_AGENT);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = deleteProfile(TEST_INVALID_AGENT);
    await assertError(Warnings, promise);
  });
});
