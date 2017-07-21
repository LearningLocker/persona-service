import assertError from 'jscommons/dist/tests/utils/assertError';
import IfMatch from '../../errors/IfMatch';
import createTextProfile from '../utils/createTextProfile';
import setup from '../utils/setup';
import {
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
} from '../utils/values';

describe('deleteProfile with etags', () => {
  const service = setup();

  it('should allow deletion when using a correct etag', async () => {
    await createTextProfile();
    const getProfileResult = await service.getProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
    await service.deleteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      ifMatch: getProfileResult.etag,
      profileId: TEST_PROFILE_ID,
    });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextProfile();
    const promise = service.deleteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      ifMatch: 'incorrect_etag',
      profileId: TEST_PROFILE_ID,
    });
    await assertError(IfMatch, promise);
  });

  it('should allow deletion when not using an IfMatch', async () => {
    await createTextProfile();
    await service.deleteProfile({
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      profileId: TEST_PROFILE_ID,
    });
  });
});
