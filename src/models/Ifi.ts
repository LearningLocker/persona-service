import Account from '../models/Account';

// Inverse function identifier
interface StringIfi {
  readonly key: 'mbox' | 'mbox_sha1sum' | 'openid';
  readonly value: string;
}

interface AccountIfi {
  readonly key: 'account';
  readonly value: Account;
}

type Ifi = StringIfi | AccountIfi;

export default Ifi;
