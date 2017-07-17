// tslint:disable:max-file-line-count
import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import * as streamToString from 'stream-to-string';
import * as stringToStream from 'string-to-stream';
import setup from './utils/setup';
import {
  TEST_ACCOUNT_AGENT,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_PROFILE_ID,
} from './utils/values';

describe('overwriteProfile', () => {
  const service = setup();

  const assertOverwrite = async (agent: any) => {
    const expectedContent = TEST_CONTENT;
    const expectedProfileIds = [TEST_PROFILE_ID];

    // Overwrites the profile.
    await service.overwriteProfile({
      agent,
      client: TEST_CLIENT,
      content: stringToStream(expectedContent),
      profileId: TEST_PROFILE_ID,
    });

    // Checks the profileIds.
    const agentProfilesResult = await service.getProfiles({
      agent,
      client: TEST_CLIENT,
    });
    const actualProfileIds = agentProfilesResult.profileIds;
    assert.deepEqual(actualProfileIds, expectedProfileIds);

    // Checks the content.
    const agentProfileResult = await service.getProfile({
      agent,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    const actualContent = await streamToString(agentProfileResult.content);
    assert.equal(actualContent, expectedContent);
  };

  const assertWarnings = async (agent: any) => {
    const promise = service.overwriteProfile({
      agent,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      profileId: TEST_PROFILE_ID,
    });
    await assertError(Warnings, promise);
  };

  it('should overwrite model when overwriting an existing model', async () => {
    const initialContent = 'initial_dummy_content';

    // Creates model with initial content.
    await service.overwriteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(initialContent),
      profileId: TEST_PROFILE_ID,
    });

    // Overwrites model with expected content.
    await assertOverwrite(TEST_MBOX_AGENT);
  });

  it('should not overwrite existing models when using a non-existing model', async () => {
    // Creates existing models.
    await service.overwriteProfile({
      agent: TEST_OPENID_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      profileId: TEST_PROFILE_ID,
    });

    // Overwrites with a non-existing model.
    await assertOverwrite(TEST_MBOX_AGENT);
  });

  it('should create model when overwriting a non-existing model with mbox', async () => {
    await assertOverwrite(TEST_MBOX_AGENT);
  });

  it('should create model when overwriting a non-existing model with mbox_sha1sum', async () => {
    await assertOverwrite(TEST_MBOXSHA1_AGENT);
  });

  it('should create model when overwriting a non-existing model with openid', async () => {
    await assertOverwrite(TEST_OPENID_AGENT);
  });

  it('should create model when overwriting a non-existing model with account', async () => {
    await assertOverwrite(TEST_ACCOUNT_AGENT);
  });

  it('should throw an error when using an invalid mbox value', async () => {
    await assertWarnings({ mbox: 'test@example.org' });
  });

  it('should throw an error when using an invalid mbox_sha1sum value', async () => {
    await assertWarnings({ mbox_sha1sum: 'test@example.org' });
  });

  it('should throw an error when using an invalid openid value', async () => {
    await assertWarnings({ openid: 'www.example.org' });
  });

  it('should throw an error when using an invalid homePage value', async () => {
    await assertWarnings({ account: {
      homePage: 'www.example.org',
      name: 'dummy_account_name',
    } });
  });

  it('should throw an error when using an invalid name type', async () => {
    await assertWarnings({ account: {
      homePage: 'http://www.example.org',
      name: 10,
    } });
  });

  it('should throw an error when using an invalid homePage value and name type', async () => {
    await assertWarnings({ account: {
      homePage: 'www.example.org',
      name: 10,
    } });
  });

  it('should throw an error when using an invalid mbox type', async () => {
    await assertWarnings({ mbox: 10 });
  });

  it('should throw an error when using an invalid mbox_sha1sum type', async () => {
    await assertWarnings({ mbox_sha1sum: 10 });
  });

  it('should throw an error when using an invalid openid type', async () => {
    await assertWarnings({ openid: 10 });
  });

  it('should throw an error when using an invalid homePage type', async () => {
    await assertWarnings({ account: {
      homePage: 10,
      name: 'dummy_account_name',
    } });
  });

  it('should throw an error when using an invalid homePage type and name type', async () => {
    await assertWarnings({ account: {
      homePage: 10,
      name: 10,
    } });
  });

  it('should throw an error when using too many IFIs', async () => {
    await assertWarnings({
      mbox: 'mailto:test@example.org',
      openid: 'http://www.example.org',
    });
  });

  it('should throw an error when using no IFIs', async () => {
    await assertWarnings({});
  });

  it('should throw an error when using an invalid IFI', async () => {
    await assertWarnings({ foo: 'bar' });
  });
});
