import Account from '../models/Account';

interface StringIfi {
  key: 'mbox' | 'mbox_sha1sum' | 'openid';
  value: string;
}

interface AccountIfi {
  key: 'account';
  value: Account;
}

type Ifi = StringIfi | AccountIfi;

export default Ifi;
