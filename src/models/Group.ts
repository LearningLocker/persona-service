import Account from './Account';
import Actor from './Actor';

interface Model {
  objectType: 'Group';
  mbox?: string;
  openid?: string;
  mbox_sha1sum?: string;
  account?: Account;
  member?: Actor[];
}

export default Model;
