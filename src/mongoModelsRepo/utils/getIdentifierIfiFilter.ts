import { ObjectID } from 'mongodb';
import Ifi from '../../models/Ifi';

export default (ifi: Ifi, organisation: string) => {
  const valueFilter = (
    ifi.key === 'account'
    ? {
      'ifi.value.homePage': ifi.value.homePage,
      'ifi.value.name': ifi.value.name,
    }
    : {
      'ifi.value': ifi.value,
    }
  );
  const out = {
    'ifi.key': ifi.key,
    ...valueFilter,
  };

  return {
    ...out,
    organisation: new ObjectID(organisation),
  };

};
