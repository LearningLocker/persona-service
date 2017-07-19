import ClientModel from '../../models/ClientModel';
import Identifier from '../../models/Identifier';
import Ifi from '../../models/Ifi';

interface Options {
  client: ClientModel;
  identifier: Identifier;
  ifi: Ifi;
}

export default ({ client, identifier, ifi }: Options) => {
  const storedIfi = identifier.ifi;

  if (identifier.organisation !== client.organisation) {
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
