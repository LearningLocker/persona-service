import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import Account from '../../models/Account';
import setup from '../utils/setup';
import {
  TEST_ACCOUNT_AGENT,
  TEST_CLIENT,
  TEST_INVALID_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../utils/values';
import assertUnnamedFullAgent from './utils/assertUnnamedFullAgent';

describe('getFullAgent with non-existing model', () => {
  const service = setup();

  it('should return the agent when using account', async () => {
    await assertUnnamedFullAgent(TEST_ACCOUNT_AGENT, {
      account: [TEST_ACCOUNT_AGENT.account as Account],
    });
  });

  it('should return the agent when using mbox', async () => {
    await assertUnnamedFullAgent(TEST_MBOX_AGENT, {
      mbox: [TEST_MBOX_AGENT.mbox as string],
    });
  });

  it('should return the agent when using mbox_sha1sum', async () => {
    await assertUnnamedFullAgent(TEST_MBOXSHA1_AGENT, {
      mbox_sha1sum: [TEST_MBOXSHA1_AGENT.mbox_sha1sum as string],
    });
  });

  it('should return the agent when using openid', async () => {
    await assertUnnamedFullAgent(TEST_OPENID_AGENT, {
      openid: [TEST_OPENID_AGENT.openid as string],
    });
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = service.getFullAgent({
      agent: TEST_INVALID_AGENT,
      client: TEST_CLIENT,
    });
    await assertError(Warnings, promise);
  });
});
