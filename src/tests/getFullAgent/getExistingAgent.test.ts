import Account from '../../models/Account';
import createTextProfile from '../utils/createTextProfile';
import setup from '../utils/setup';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
} from '../utils/values';
import assertUnnamedFullAgent from './utils/assertUnnamedFullAgent';

describe('getFullAgent with existing model', () => {
  setup();

  it('should return the agent when using account', async () => {
    await createTextProfile(TEST_ACCOUNT_AGENT);
    await assertUnnamedFullAgent(TEST_ACCOUNT_AGENT, {
      account: [TEST_ACCOUNT_AGENT.account as Account],
    });
  });

  it('should return the agent when using mbox', async () => {
    await createTextProfile(TEST_MBOX_AGENT);
    await assertUnnamedFullAgent(TEST_MBOX_AGENT, {
      mbox: [TEST_MBOX_AGENT.mbox as string],
    });
  });

  it('should return the agent when using mbox_sha1sum', async () => {
    await createTextProfile(TEST_MBOXSHA1_AGENT);
    await assertUnnamedFullAgent(TEST_MBOXSHA1_AGENT, {
      mbox_sha1sum: [TEST_MBOXSHA1_AGENT.mbox_sha1sum as string],
    });
  });

  it('should return the agent when using openid', async () => {
    await createTextProfile(TEST_OPENID_AGENT);
    await assertUnnamedFullAgent(TEST_OPENID_AGENT, {
      openid: [TEST_OPENID_AGENT.openid as string],
    });
  });

  /*
  it('should return matching agents when using all IFIs', async () => {
    await createProfile(TEST_ACCOUNT_AGENT);
    await createProfile(TEST_MBOX_AGENT);
    await createProfile(TEST_MBOXSHA1_AGENT);
    await createProfile(TEST_OPENID_AGENT);
    // TODO: Merge identifiers into one persona.
    const fullAgent = await assertUnnamedFullAgent(TEST_OPENID_AGENT);
    assert.deepEqual(fullAgent.account, [TEST_ACCOUNT_AGENT.account]);
    assert.deepEqual(fullAgent.mbox, [TEST_MBOX_AGENT.mbox]);
    assert.deepEqual(fullAgent.mbox_sha1sum, [TEST_MBOXSHA1_AGENT.mbox_sha1sum]);
    assert.deepEqual(fullAgent.openid, [TEST_OPENID_AGENT.openid]);
  });
  */
});
