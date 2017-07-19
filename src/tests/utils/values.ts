import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import { ALL } from '../../utils/scopes';

export const TEST_CLIENT: ClientModel = {
  _id: 'dummy_id',
  authority: {
    mbox: 'mailto:test_authority@example.org',
    objectType: 'Agent',
  },
  isTrusted: true,
  lrs_id: 'dummy_lrs_id',
  organisation: 'dummy_organisation',
  scopes: [ALL],
  title: 'dummy_title',
};

export const TEST_MBOX_AGENT: Agent = {
  mbox: 'mailto:test_agent@example.org',
};

export const TEST_MBOXSHA1_AGENT: Agent = {
  mbox_sha1sum: 'aabbd60ef591bcc908fff6fd2571e8ef8d62461f',
};

export const TEST_OPENID_AGENT: Agent = {
  openid: 'http://www.example.com',
};

export const TEST_ACCOUNT_AGENT: Agent = {
  account: {
    homePage: 'http://www.example.org',
    name: 'dummy_account_nane',
  },
};

export const TEST_PROFILE_ID = 'dummy_profile_id';

export const TEST_CONTENT = 'dummy_content';
export const TEST_JSON_CONTENT = '[]';
export const TEST_OBJECT_CONTENT = '{"foo":1}';

export const TEXT_CONTENT_TYPE = 'text/plain';
export const JSON_CONTENT_TYPE = 'application/json';

export const TEST_INVALID_AGENT = {
  foo: 10,
};

export const TEST_CLIENT_OUTSIDE_STORE = {
  ...TEST_CLIENT,
  lrs_id: 'incorrect_lrs_id',
};

export const TEST_CLIENT_OUTSIDE_ORG = {
  ...TEST_CLIENT,
  organisation: 'incorrect_organisation',
};
