import Agent from '../../models/Agent';
import Ifi from '../../models/Ifi';

export default (agent: Agent): Ifi => {
  if (agent.mbox !== undefined) {
    return {
      key: 'mbox',
      value: agent.mbox,
    };
  }
  if (agent.mbox_sha1sum !== undefined) {
    return {
      key: 'mbox_sha1sum',
      value: agent.mbox_sha1sum,
    };
  }
  if (agent.openid !== undefined) {
    return {
      key: 'openid',
      value: agent.openid,
    };
  }
  if (agent.account !== undefined) {
    return {
      key: 'account',
      value: {
        homePage: agent.account.homePage,
        name: agent.account.name,
      },
    };
  }
  /* istanbul ignore next */
  throw new Error('Missing Agent IFI');
};
