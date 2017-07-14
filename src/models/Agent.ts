import Account from './Account';

interface Model {
  mbox?: string;
  mbox_sha1sum?: string;
  openid?: string;
  account?: Account;
}

export default Model;
