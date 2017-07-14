import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';

export default (identifier: Identifier, ifi: Ifi) => {
  const storedIfi = identifier.ifi;
  return (
    storedIfi.key === 'account' && ifi.key === 'account'
      ? (
        storedIfi.value.homePage === ifi.value.homePage &&
        storedIfi.value.name === ifi.value.name
      )
      : (
        storedIfi.key === ifi.key &&
        storedIfi.value === ifi.value
      )
  );
};
