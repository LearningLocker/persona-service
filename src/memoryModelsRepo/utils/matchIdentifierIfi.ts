import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';

export interface Options {
  readonly organisation: string;
  readonly identifier: Identifier;
  readonly ifi: Ifi;
}

export default ({ organisation, identifier, ifi }: Options) => {
  const storedIfi = identifier.ifi;

  if (identifier.organisation !== organisation) {
    return false;
  }

  if (storedIfi.key === 'account' && ifi.key === 'account') {
    return (
      storedIfi.value.homePage === ifi.value.homePage &&
      storedIfi.value.name === ifi.value.name
    );
  }

  return (
    storedIfi.key === ifi.key &&
    storedIfi.value === ifi.value
  );
};
