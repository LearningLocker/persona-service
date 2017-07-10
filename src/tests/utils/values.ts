import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';

export const TEST_CLIENT: ClientModel = {
  _id: 'dummy_id',
  authority: {
    mbox: 'mailto:test_authority@example.org',
    objectType: 'Agent',
  },
  isTrusted: true,
  lrs_id: 'dummy_lrs_id',
  organisation: 'dummy_organisation',
  scopes: [],
  title: 'dummy_title',
};

export const TEST_AGENT: Agent = {
  mbox: 'mailto:test_agent@example.org',
  objectType: 'Agent',
};
