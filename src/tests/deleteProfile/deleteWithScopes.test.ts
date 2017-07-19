import Forbidden from 'jscommons/dist/errors/Forbidden';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { XAPI_PROFILE_ALL } from '../../utils/scopes';
import setup from '../utils/setup';
import { TEST_CLIENT, TEST_MBOX_AGENT, TEST_PROFILE_ID } from '../utils/values';

describe('deleteProfile with scopes', () => {
  const service = setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = service.deleteProfile({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      profileId: TEST_PROFILE_ID,
    });
    await assertError(Forbidden, promise);
  });

  it('should throw no model error when using valid scopes', async () => {
    const scopes = [XAPI_PROFILE_ALL];
    const promise = service.deleteProfile({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      profileId: TEST_PROFILE_ID,
    });
    await assertError(NoModel, promise);
  });
});
