import Ifi from '../../models/Ifi';

export default (ifi: Ifi) => {
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
  return {
    'ifi.key': ifi.key,
    ...valueFilter,
  };
};
