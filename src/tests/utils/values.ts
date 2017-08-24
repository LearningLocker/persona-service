import Ifi from '../../models/Ifi';

export const TEST_ORGANISATION = '58fe13e34effd3c26a7fc4b8';

export const TEST_PROFILE_ID = 'dummy_profile_id';

export const TEST_CONTENT = 'dummy_content';
export const TEST_JSON_CONTENT = '[]';
export const TEST_OBJECT_CONTENT = '{"foo":1}';

export const TEXT_CONTENT_TYPE = 'text/plain';
export const JSON_CONTENT_TYPE = 'application/json';

export const TEST_INVALID_AGENT = {
  foo: 10,
};

export const TEST_ORGANISATION_OUTSIDE_STORE = '58fe13e34effd3c26a7fc4c7';

export const TEST_IFI: Ifi = {
  key: 'mbox',
  value: 'test@test.com',
};

export const TEST_OPENID_IFI: Ifi = {
  key: 'openid',
  value: 'http://www.example.com',
};

export const TEST_ACCOUNT_IFI: Ifi = {
  key: 'account',
  value: {
    homePage: 'test.com',
    name: 'test',
  },
};
