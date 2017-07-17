import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';

export default (identifier: Identifier, ifi: Ifi) => {
  const storedIfi = identifier.ifi;

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
