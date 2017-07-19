import * as assert from 'assert';
import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { XAPI_READ } from '../../utils/scopes';
import setup from '../utils/setup';
import { TEST_CLIENT, TEST_MBOX_AGENT } from '../utils/values';

describe('getProfiles with scopes', () => {
  const service = setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = service.getProfiles({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
    });
    await assertError(Forbidden, promise);
  });

  it('should return no models when using valid scopes', async () => {
    const scopes = [XAPI_READ];
    const getProfilesResult = await service.getProfiles({
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
    });
    assert.deepEqual(getProfilesResult.profileIds, []);
  });
});
