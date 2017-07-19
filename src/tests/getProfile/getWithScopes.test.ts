import Forbidden from 'jscommons/dist/errors/Forbidden';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { PROFILE_READ_SCOPES } from '../../utils/scopes';
import setup from '../utils/setup';
import { TEST_CLIENT, TEST_MBOX_AGENT, TEST_PROFILE_ID } from '../utils/values';

describe('getProfile with scopes', () => {
  const service = setup();

  const assertForbidden = async (scopes: string[]) => {
    const promise = service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      profileId: TEST_PROFILE_ID,
    });
    await assertError(Forbidden, promise);
  };

  const assertAllowed = async (scopes: string[]) => {
    const promise = service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      profileId: TEST_PROFILE_ID,
    });
    await assertError(NoModel, promise);
  };

  it('should throw forbidden error when using no scopes', async () => {
    await assertForbidden([]);
  });

  it('should throw forbidden error when using invalid scope', async () => {
    await assertForbidden(['invalid_scope']);
  });

  it('should throw no model error when using valid scopes', async () => {
    await Promise.all(PROFILE_READ_SCOPES.map((scope) => {
      return assertAllowed([scope]);
    }));
  });
});
