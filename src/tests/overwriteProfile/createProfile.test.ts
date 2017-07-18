import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import assertProfile from '../utils/assertProfile';
import setup from '../utils/setup';
import {
  TEST_ACCOUNT_AGENT,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../utils/values';
import overwriteProfile from './utils/overwriteProfile';

describe('overwriteProfile with non-existing model', () => {
  setup();

  it('should create when with mbox', async () => {
    await overwriteProfile(TEST_MBOX_AGENT, TEST_CONTENT);
    await assertProfile(TEST_MBOX_AGENT, TEST_CONTENT);
  });

  it('should create when with mbox_sha1sum', async () => {
    await overwriteProfile(TEST_MBOXSHA1_AGENT, TEST_CONTENT);
    await assertProfile(TEST_MBOXSHA1_AGENT, TEST_CONTENT);
  });

  it('should create when with openid', async () => {
    await overwriteProfile(TEST_OPENID_AGENT, TEST_CONTENT);
    await assertProfile(TEST_OPENID_AGENT, TEST_CONTENT);
  });

  it('should create when with account', async () => {
    await overwriteProfile(TEST_ACCOUNT_AGENT, TEST_CONTENT);
    await assertProfile(TEST_ACCOUNT_AGENT, TEST_CONTENT);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = overwriteProfile(TEST_INVALID_AGENT, TEST_CONTENT);
    await assertError(Warnings, promise);
  });
});
